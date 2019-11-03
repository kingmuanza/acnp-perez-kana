import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ACNPDocument } from 'src/app/models/document.model';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit, OnChanges {

  @Input() document: ACNPDocument;
  doc = new Document();

  constructor() { }

  ngOnInit() {
    this.createWordDocument();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changement');
  }

  createWordDocument() {
    this.doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun('Hello World'),
            new TextRun({
              text: 'Foo Bar',
              bold: true,
            }),
            new TextRun({
              text: 'Github is the best',
              bold: true,
            }).tab(),
          ],
        }),
      ],
    });
  }

  exportToWord() {
    console.log('exportToWord');
    Packer.toBuffer(this.doc).then((buffer) => {
      console.log(buffer);
      saveAs.saveAs('MyDocument.docx', buffer);
    });
  }

}
