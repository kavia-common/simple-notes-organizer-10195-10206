import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    // Initialize with some sample notes
    this.addNote({
      title: 'Welcome to Notes',
      content: 'This is your first note. Start organizing your thoughts!',
      color: '#e8f5e9'
    });
  }

  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  // PUBLIC_INTERFACE
  searchNotes(query: string): Observable<Note[]> {
    return this.getNotes().pipe(
      map(notes => notes.filter(note => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  // PUBLIC_INTERFACE
  addNote(noteData: Partial<Note>): void {
    const note: Note = {
      id: Math.random().toString(36).substring(7),
      title: noteData.title || 'Untitled',
      content: noteData.content || '',
      color: noteData.color,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.notes = [...this.notes, note];
    this.notesSubject.next(this.notes);
  }

  // PUBLIC_INTERFACE
  updateNote(id: string, noteData: Partial<Note>): void {
    this.notes = this.notes.map(note => 
      note.id === id 
        ? { ...note, ...noteData, updatedAt: Date.now() }
        : note
    );
    this.notesSubject.next(this.notes);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }
}
