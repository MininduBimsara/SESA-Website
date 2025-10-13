"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Edit, Trash2, GripVertical, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import type { Team, Member } from "@/types/team";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    SensorDescriptor,
    SensorOptions,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import TeamFormModal from "./TeamFormModal";
import MemberFormModal from "./MemberFormModal";

interface SortableMemberProps {
    member: Member;
    onEdit: (member: Member) => void;
    onDelete: (memberId: string) => void;
}

const SortableMember: React.FC<SortableMemberProps> = ({ member, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: member.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
        >
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab hover:bg-gray-100 p-2 rounded"
            >
                <GripVertical className="w-5 h-5 text-gray-400" />
            </button>

            {member.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.position}</p>
            </div>

            <div className="flex gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(member)}
                >
                    <Edit className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(member.id)}
                    className="text-red-600 hover:text-red-700"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

const AdminTeam = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
    const [showTeamForm, setShowTeamForm] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [activeTeamId, setActiveTeamId] = useState<string>("");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const fetchTeams = async () => {
        try {
            setError(null);
            const response = await fetch("/api/team");
            if (!response.ok) {
                throw new Error("Failed to fetch teams");
            }
            const data = await response.json();
            // Ensure data is an array
            if (Array.isArray(data)) {
                setTeams(data);
                // Auto-expand the latest team (current team)
                if (data.length > 0) {
                    setExpandedTeams(new Set([data[0].id]));
                }
            } else {
                console.error("API returned non-array data:", data);
                setTeams([]);
                setError("Received invalid data from server");
            }
        } catch (error) {
            console.error("Error fetching teams:", error);
            setTeams([]);
            setError("Failed to load teams. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const currentYear = new Date().getFullYear();
    const currentTeam = Array.isArray(teams) ? teams.find((t) => t.year === currentYear) : undefined;
    const pastTeams = Array.isArray(teams) ? teams.filter((t) => t.year < currentYear) : [];

    const toggleTeamExpand = (teamId: string) => {
        setExpandedTeams((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(teamId)) {
                newSet.delete(teamId);
            } else {
                newSet.add(teamId);
            }
            return newSet;
        });
    };

    const handleDragEnd = async (event: DragEndEvent, teamId: string) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const team = teams.find((t) => t.id === teamId);
        if (!team) return;

        const oldIndex = team.members.findIndex((m) => m.id === active.id);
        const newIndex = team.members.findIndex((m) => m.id === over.id);

        const newMembers = arrayMove(team.members, oldIndex, newIndex);

        // Optimistically update UI
        setTeams((prevTeams) =>
            prevTeams.map((t) =>
                t.id === teamId ? { ...t, members: newMembers } : t
            )
        );

        // Save to backend
        try {
            await fetch(`/api/team/${teamId}/members`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ members: newMembers }),
            });
        } catch (error) {
            console.error("Error reordering members:", error);
            fetchTeams(); // Revert on error
        }
    };

    const handleCreateTeam = () => {
        setSelectedTeam(null);
        setShowTeamForm(true);
    };

    const handleEditTeam = (team: Team) => {
        setSelectedTeam(team);
        setShowTeamForm(true);
    };

    const handleDeleteTeam = async (teamId: string) => {
        if (!confirm("Are you sure you want to delete this team? All members will be removed.")) return;

        try {
            await fetch(`/api/team/${teamId}`, { method: "DELETE" });
            fetchTeams();
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    };

    const handleAddMember = (teamId: string) => {
        setActiveTeamId(teamId);
        setSelectedMember(null);
        setShowMemberForm(true);
    };

    const handleEditMember = (member: Member) => {
        setActiveTeamId(member.teamId);
        setSelectedMember(member);
        setShowMemberForm(true);
    };

    const handleDeleteMember = async (memberId: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return;

        try {
            await fetch(`/api/team/members/${memberId}`, { method: "DELETE" });
            fetchTeams();
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const handleTeamSubmit = async (teamData: Partial<Team>) => {
        try {
            if (selectedTeam) {
                await fetch(`/api/team/${selectedTeam.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(teamData),
                });
            } else {
                await fetch("/api/team", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(teamData),
                });
            }
            fetchTeams();
            setShowTeamForm(false);
        } catch (error) {
            console.error("Error saving team:", error);
        }
    };

    const handleMemberSubmit = async (memberData: Partial<Member>) => {
        try {
            if (selectedMember) {
                await fetch(`/api/team/members/${selectedMember.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(memberData),
                });
            } else {
                await fetch(`/api/team/${activeTeamId}/members`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(memberData),
                });
            }
            fetchTeams();
            setShowMemberForm(false);
        } catch (error) {
            console.error("Error saving member:", error);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <p>Loading teams...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <Card className="p-8 bg-red-50 border-red-200">
                    <div className="text-center">
                        <div className="text-red-600 text-5xl mb-4">⚠️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Error Loading Teams
                        </h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button 
                            onClick={() => {
                                setLoading(true);
                                fetchTeams();
                            }}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Try Again
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Users className="text-purple-600" size={32} />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
                            <p className="text-gray-600 mt-1">Manage team members and positions</p>
                        </div>
                    </div>
                    <Button onClick={handleCreateTeam} className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Team
                    </Button>
                </div>

                {teams.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Users size={64} className="mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No Teams Yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Start by creating your first team.
                        </p>
                        <Button onClick={handleCreateTeam} className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Team
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Current Team */}
                        {currentTeam && (
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Current Team</h2>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                        {currentTeam.year}
                                    </span>
                                </div>
                                <TeamCard
                                    team={currentTeam}
                                    isExpanded={expandedTeams.has(currentTeam.id)}
                                    onToggle={() => toggleTeamExpand(currentTeam.id)}
                                    onEdit={handleEditTeam}
                                    onDelete={handleDeleteTeam}
                                    onAddMember={handleAddMember}
                                    onEditMember={handleEditMember}
                                    onDeleteMember={handleDeleteMember}
                                    onDragEnd={handleDragEnd}
                                    sensors={sensors}
                                />
                            </div>
                        )}

                        {/* Past Teams */}
                        {pastTeams.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                    <h2 className="text-2xl font-bold text-gray-900">Past Teams</h2>
                                </div>
                                <div className="space-y-4">
                                    {pastTeams.map((team) => (
                                        <TeamCard
                                            key={team.id}
                                            team={team}
                                            isExpanded={expandedTeams.has(team.id)}
                                            onToggle={() => toggleTeamExpand(team.id)}
                                            onEdit={handleEditTeam}
                                            onDelete={handleDeleteTeam}
                                            onAddMember={handleAddMember}
                                            onEditMember={handleEditMember}
                                            onDeleteMember={handleDeleteMember}
                                            onDragEnd={handleDragEnd}
                                            sensors={sensors}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Modals */}
                {showTeamForm && (
                    <TeamFormModal
                        team={selectedTeam}
                        onClose={() => setShowTeamForm(false)}
                        onSubmit={handleTeamSubmit}
                    />
                )}

                {showMemberForm && (
                    <MemberFormModal
                        member={selectedMember}
                        teamId={activeTeamId}
                        onClose={() => setShowMemberForm(false)}
                        onSubmit={handleMemberSubmit}
                    />
                )}
            </div>
        </div>
    );
};

interface TeamCardProps {
    team: Team;
    isExpanded: boolean;
    onToggle: () => void;
    onEdit: (team: Team) => void;
    onDelete: (teamId: string) => void;
    onAddMember: (teamId: string) => void;
    onEditMember: (member: Member) => void;
    onDeleteMember: (memberId: string) => void;
    onDragEnd: (event: DragEndEvent, teamId: string) => void;
    sensors: SensorDescriptor<SensorOptions>[];
}

const TeamCard: React.FC<TeamCardProps> = ({
    team,
    isExpanded,
    onToggle,
    onEdit,
    onDelete,
    onAddMember,
    onEditMember,
    onDeleteMember,
    onDragEnd,
    sensors,
}) => {
    return (
        <Card className="overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onToggle}
                        className="flex items-center gap-3 flex-1 text-left hover:opacity-80 transition-opacity"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                            <p className="text-sm text-gray-600">
                                Year {team.year} • {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </button>

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAddMember(team.id)}
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Member
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(team)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDelete(team.id)}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {isExpanded && (
                    <div className="mt-6">
                        {team.members.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600 mb-4">No members in this team yet</p>
                                <Button
                                    size="sm"
                                    onClick={() => onAddMember(team.id)}
                                    className="bg-purple-600 hover:bg-purple-700"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add First Member
                                </Button>
                            </div>
                        ) : (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => onDragEnd(event, team.id)}
                            >
                                <SortableContext
                                    items={team.members.map((m) => m.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-3">
                                        {team.members.map((member) => (
                                            <SortableMember
                                                key={member.id}
                                                member={member}
                                                onEdit={onEditMember}
                                                onDelete={onDeleteMember}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AdminTeam;
