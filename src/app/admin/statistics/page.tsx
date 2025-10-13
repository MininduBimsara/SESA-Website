'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

interface Statistic {
    id: string
    label: string
    value: string
    icon: string
    color: string
    order: number
    active: boolean
    createdAt: string
    updatedAt: string
}

// Common icons for statistics
const commonIcons = ['Users', 'Calendar', 'Trophy', 'Code', 'Award', 'Target', 'Zap', 'Star', 'Heart', 'TrendingUp']

export default function StatisticsPage() {
    const [statistics, setStatistics] = useState<Statistic[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        label: '',
        value: '',
        icon: 'Users',
        color: 'rose',
        order: 0,
        active: true,
    })

    useEffect(() => {
        fetchStatistics()
    }, [])

    const fetchStatistics = async () => {
        try {
            const res = await fetch('/api/statistics')
            const data = await res.json()
            setStatistics(data)
        } catch (error) {
            console.error('Failed to fetch statistics:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const url = editingId ? `/api/statistics/${editingId}` : '/api/statistics'
            const method = editingId ? 'PUT' : 'POST'
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                fetchStatistics()
                resetForm()
            }
        } catch (error) {
            console.error('Failed to save statistic:', error)
        }
    }

    const handleEdit = (statistic: Statistic) => {
        setEditingId(statistic.id)
        setFormData({
            label: statistic.label,
            value: statistic.value,
            icon: statistic.icon,
            color: statistic.color,
            order: statistic.order,
            active: statistic.active,
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this statistic?')) return

        try {
            const res = await fetch(`/api/statistics/${id}`, { method: 'DELETE' })
            if (res.ok) {
                fetchStatistics()
            }
        } catch (error) {
            console.error('Failed to delete statistic:', error)
        }
    }

    const resetForm = () => {
        setFormData({ label: '', value: '', icon: 'Users', color: 'rose', order: 0, active: true })
        setEditingId(null)
        setShowForm(false)
    }

    const getIconComponent = (iconName: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (LucideIcons as any)[iconName] || LucideIcons.Users
    }

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            rose: 'bg-rose-100 text-rose-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            green: 'bg-green-100 text-green-600',
        }
        return colors[color] || colors.rose
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Statistics Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Statistic
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Statistic' : 'Add New Statistic'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Label</label>
                            <input
                                type="text"
                                value={formData.label}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="e.g., Active Members"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Value</label>
                            <input
                                type="text"
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="e.g., 200+"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Icon</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                {commonIcons.map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Color</label>
                            <select
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="rose">Rose</option>
                                <option value="blue">Blue</option>
                                <option value="purple">Purple</option>
                                <option value="green">Green</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label className="text-sm font-medium">Active (Show on homepage)</label>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700"
                            >
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.map((stat) => {
                    const Icon = getIconComponent(stat.icon)
                    return (
                        <div key={stat.id} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-full ${getColorClasses(stat.color)} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {stat.active ? (
                                    <Eye className="w-5 h-5 text-green-500" />
                                ) : (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                )}
                            </div>

                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 mb-4">{stat.label}</div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className="text-xs text-gray-500">Order: {stat.order}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(stat)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(stat.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {statistics.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No statistics yet. Add your first statistic!
                </div>
            )}
        </div>
    )
}
