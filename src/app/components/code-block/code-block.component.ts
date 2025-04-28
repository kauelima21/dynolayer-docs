import { Component, input, ViewChild, type AfterViewInit, type ElementRef, type OnInit } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code-block',
  imports: [],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css'
})
export class CodeBlockComponent implements OnInit, AfterViewInit {
  code = input.required<string>();
  language = input<string>('python');
  highlightedCode!: string;

  @ViewChild('codeBlock') codeBlock!: ElementRef;

  ngOnInit() {
    this.highlightedCode = this.escapeHtml(this.code());
  }

  escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  ngAfterViewInit() {
    hljs.highlightElement(this.codeBlock.nativeElement);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.code());
  }
}
