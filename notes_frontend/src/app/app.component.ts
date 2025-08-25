import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Note } from './core/models/note.model';
import { NotesService } from './core/services/notes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDialogModule,
    SidebarComponent,
    NoteCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  notes: Note[] = [];

  constructor(
    private notesService: NotesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  onCreateNote(): void {
    const dialogRef = this.dialog.open(NoteEditorComponent, {
      data: { note: undefined },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.addNote(result);
      }
    });
  }

  onEditNote(note: Note): void {
    const dialogRef = this.dialog.open(NoteEditorComponent, {
      data: { note },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.updateNote(note.id, result);
      }
    });
  }

  onDeleteNote(id: string): void {
    this.notesService.deleteNote(id);
  }

  onSearch(query: string): void {
    if (query) {
      this.notesService.searchNotes(query).subscribe(notes => {
        this.notes = notes;
      });
    } else {
      this.notesService.getNotes().subscribe(notes => {
        this.notes = notes;
      });
    }
  }
}
