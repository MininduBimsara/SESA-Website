'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface Partner {
    id: string
    name: string
    logo: string
    website: string | null
    order: number
    active: boolean
    createdAt: string
    updatedAt: string
}

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        order: 0,
        active: true,
    })
    const [logoFile, setLogoFile] = useState<File | null>(null)

    useEffect(() => {
        fetchPartners()
    }, [])

    const fetchPartners = async () => {
        try {
            const res = await fetch('/api/partners')
            const data = await res.json()
            setPartners(data)
        } catch (error) {
            console.error('Failed to fetch partners:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', formData.name)
        data.append('website', formData.website)
        data.append('order', String(formData.order))
        data.append('active', String(formData.active))
        if (logoFile) {
            data.append('logo', logoFile)
        }

        try {
            const url = editingId ? `/api/partners/${editingId}` : '/api/partners'
            const method = editingId ? 'PUT' : 'POST'
            const res = await fetch(url, { method, body: data })

            if (res.ok) {
                fetchPartners()
                resetForm()
            }
        } catch (error) {
            console.error('Failed to save partner:', error)
        }
    }

    const handleEdit = (partner: Partner) => {
        setEditingId(partner.id)
        setFormData({
            name: partner.name,
            website: partner.website || '',
            order: partner.order,
            active: partner.active,
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this partner?')) return

        try {
            const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' })
            if (res.ok) {
                fetchPartners()
            }
        } catch (error) {
            console.error('Failed to delete partner:', error)
        }
    }

    const resetForm = () => {
        setFormData({ name: '', website: '', order: 0, active: true })
        setLogoFile(null)
        setEditingId(null)
        setShowForm(false)
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Partners Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Partner
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Partner' : 'Add New Partner'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Partner Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                className="w-full border rounded-lg px-4 py-2"
                                required={!editingId}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Recommended: Square logo (PNG with transparent background preferred)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Website (Optional)</label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="https://example.com"
                            />
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

            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {partners.map((partner) => (
                    <div key={partner.id} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-end mb-2">
                            {partner.active ? (
                                <Eye className="w-5 h-5 text-green-500" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                            )}
                        </div>

                        <div className="relative w-24 h-24 mx-auto mb-4 border rounded-lg p-2">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h3 className="font-bold text-center mb-2">{partner.name}</h3>
                        
                        {partner.website && (
                            <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-3"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Visit Website
                            </a>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t">
                            <span className="text-xs text-gray-500">Order: {partner.order}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(partner)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(partner.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {partners.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No partners yet. Add your first partner!
                </div>
            )}
        </div>
    )
}
