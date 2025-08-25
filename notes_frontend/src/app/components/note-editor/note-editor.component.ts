import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Note } from '../../core/models/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent {
  noteForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NoteEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { note?: Note }
  ) {
    this.isEditMode = !!data.note;
    this.noteForm = this.fb.group({
      title: [data.note?.title || '', Validators.required],
      content: [data.note?.content || '', Validators.required],
      color: [data.note?.color || '#ffffff']
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const formValue = this.noteForm.value;
      this.dialogRef.close({
        ...(this.data.note || {}),
        ...formValue
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
