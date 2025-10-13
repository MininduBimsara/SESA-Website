'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Star } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
    id: string
    name: string
    role: string
    image: string | null
    quote: string
    featured: boolean
    order: number
    createdAt: string
    updatedAt: string
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        quote: '',
        featured: false,
        order: 0,
    })
    const [imageFile, setImageFile] = useState<File | null>(null)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/testimonials')
            const data = await res.json()
            setTestimonials(data)
        } catch (error) {
            console.error('Failed to fetch testimonials:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData()
        data.append('name', formData.name)
        data.append('role', formData.role)
        data.append('quote', formData.quote)
        data.append('featured', String(formData.featured))
        data.append('order', String(formData.order))
        if (imageFile) {
            data.append('image', imageFile)
        }

        try {
            const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials'
            const method = editingId ? 'PUT' : 'POST'
            const res = await fetch(url, { method, body: data })
            
            if (res.ok) {
                fetchTestimonials()
                resetForm()
            }
        } catch (error) {
            console.error('Failed to save testimonial:', error)
        }
    }

    const handleEdit = (testimonial: Testimonial) => {
        setEditingId(testimonial.id)
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            quote: testimonial.quote,
            featured: testimonial.featured,
            order: testimonial.order,
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return

        try {
            const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
            if (res.ok) {
                fetchTestimonials()
            }
        } catch (error) {
            console.error('Failed to delete testimonial:', error)
        }
    }

    const resetForm = () => {
        setFormData({ name: '', role: '', quote: '', featured: false, order: 0 })
        setImageFile(null)
        setEditingId(null)
        setShowForm(false)
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Testimonials Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Quote</label>
                            <textarea
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2 h-32"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <label className="text-sm font-medium">Featured (Show on homepage)</label>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-rose-200">
                                <Image
                                    src={testimonial.image || '/placeholder-user.jpg'}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">{testimonial.name}</h3>
                                    {testimonial.featured && (
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    )}
                                </div>
                                <p className="text-sm text-rose-600">{testimonial.role}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{testimonial.quote}</p>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Order: {testimonial.order}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(testimonial)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No testimonials yet. Add your first testimonial!
                </div>
            )}
        </div>
    )
}
