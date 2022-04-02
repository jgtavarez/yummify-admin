// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Extras
import { InitialLetterPipe } from './pipes/initial-letter.pipe';

@NgModule({
  declarations: [
    InitialLetterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InitialLetterPipe
  ]
})
export class SharedModule { }
