"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { X, UploadCloud, FileText } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { createNote, createPyq } from "@/app/actions"

interface UploadModalProps {
    isOpen: boolean
    onClose: () => void
    type: "Note" | "PYQ"
}

export function UploadModal({ isOpen, onClose, type }: UploadModalProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const action = type === 'Note' ? createNote : createPyq

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        setIsLoading(true);
        
        try {
            // Get the form data manually to ensure file is included
            const formData = new FormData(e.currentTarget);
            
            // Get the file input element by its ID
            const fileInput = document.getElementById(`file-input-${type}`) as HTMLInputElement;
            if (fileInput && fileInput.files && fileInput.files[0]) {
                formData.set('file', fileInput.files[0]);
            }
            
            const result = await action(formData);
            if (result?.success) {
                toast.success(result.message);
                onClose();
            } else {
                toast.error(result?.message || "Upload failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <Card className="w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-slate-100 text-slate-500 dark:hover:bg-slate-800"
                >
                    <X className="h-5 w-5" />
                </button>
                <CardHeader>
                    <CardTitle>Upload {type}</CardTitle>
                    <CardDescription>Share your resources with the community.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
                                isDragOver ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-slate-200 dark:border-slate-700"
                            )}
                            onClick={() => document.getElementById(`file-input-${type}`)?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                
                                // Handle dropped file
                                const files = e.dataTransfer.files;
                                if (files.length > 0) {
                                    const fileInput = document.getElementById(`file-input-${type}`) as HTMLInputElement;
                                    if (fileInput) {
                                        // Create a new FileList-like object to set the files
                                        // We'll use a workaround by triggering a change event
                                        const event = new Event('change', { bubbles: true });
                                        fileInput.files = files;
                                        fileInput.dispatchEvent(event);
                                    }
                                }
                            }}
                        >
                            <div className="bg-indigo-100 p-3 rounded-full mb-3 dark:bg-indigo-900/50">
                                <UploadCloud className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                PDF, DOCX up to 10MB
                            </p>
                            <input
                                id={`file-input-${type}`}
                                type="file"
                                name="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        console.log('File selected:', e.target.files[0].name);
                                        // Update the UI to show selected file
                                        const fileNameElement = document.createElement('div');
                                        fileNameElement.className = 'text-xs text-indigo-600 mt-2';
                                        fileNameElement.textContent = `Selected: ${e.target.files[0].name}`;
                                        
                                        // Find the container and update it
                                        const container = e.target.closest('div')?.parentElement;
                                        if (container) {
                                            // Remove any existing file name element
                                            const existingFileName = container.querySelector('.file-name-display');
                                            if (existingFileName) {
                                                existingFileName.remove();
                                            }
                                            
                                            fileNameElement.className += ' file-name-display';
                                            container.appendChild(fileNameElement);
                                        }
                                    }
                                }}
                            />
                        </div>

                        <div className="space-y-3">
                            {type === 'Note' && (
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Title</label>
                                    <input
                                        name="title"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                        placeholder="e.g. Data Structures Unit 1"
                                        required
                                    />
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Subject</label>
                                <input
                                    name="subject"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                    placeholder="e.g. Engineering Physics"
                                    required
                                />
                            </div>

                            {type === 'PYQ' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Semester</label>
                                        <select
                                            name="semester"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                            required
                                        >
                                            <option value="1st Semester">1st Semester</option>
                                            <option value="2nd Semester">2nd Semester</option>
                                            <option value="3rd Semester">3rd Semester</option>
                                            <option value="4th Semester">4th Semester</option>
                                            <option value="5th Semester">5th Semester</option>
                                            <option value="6th Semester">6th Semester</option>
                                            <option value="7th Semester">7th Semester</option>
                                            <option value="8th Semester">8th Semester</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Year</label>
                                        <select
                                            name="year"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800"
                                            required
                                        >
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading}>
                            {isLoading ? "Uploading..." : `Upload ${type}`}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
