import { promises as fs } from 'fs';
import path from 'path';
import IDocument from '../interfaces/IDocument';
import UserService from './userService';
import ApiErrors from '../utils/apiErros';
import { StatusCodes } from 'http-status-codes';

const documentsFilePath = path.join(__dirname, '../database', 'documents.json');
const usersFilePath = path.join(__dirname, '../database', 'users.json');

class DocumentService {

  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  private async readFile(): Promise<IDocument[]> {
    const data = await fs.readFile(documentsFilePath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeFile(documents: IDocument[]): Promise<void> {
    await fs.writeFile(documentsFilePath, JSON.stringify(documents, null, 2), 'utf-8');
  }

  public async getAllDocuments(userId: number): Promise<IDocument[]> {
    const documents = await this.readFile();
    await this.userService.getUserById(userId)
    
    return documents.filter(doc => doc.userId === userId);
  }

  public async getDocumentById(id: number, userId: number): Promise<IDocument | undefined> {
    const documents = await this.readFile();
    await this.userService.getUserById(userId)
    const docs = documents.find(doc => doc.id === id && doc.userId === userId);
    if(!docs) throw new ApiErrors('Documento não encontrado.', StatusCodes.NOT_FOUND)
    return docs
  }

  public async createDocument(newDocument: IDocument): Promise<IDocument> {

    await this.userService.getUserById(newDocument.userId)

    const documents = await this.readFile();
    const id = documents.length ? documents[documents.length - 1].id + 1 : 1;

    const docWithIdFirst: IDocument = {
      id,
      ...newDocument 
    };
    
    documents.push(docWithIdFirst);
    await this.writeFile(documents);
    return newDocument;
  }

  public async updateDocument(updatedDocument: IDocument): Promise<IDocument | undefined> {
    await this.userService.getUserById(updatedDocument.userId)
    const documents = await this.readFile();
    const index = documents.findIndex(doc => doc.id === updatedDocument.id && doc.userId === updatedDocument.userId);
    if (index === -1) throw new ApiErrors('Documento não encontrado.', StatusCodes.NOT_FOUND);

    documents[index] = updatedDocument;
    await this.writeFile(documents);
    return updatedDocument;
  }

  public async deleteDocument(id: number, userId: number): Promise<boolean> {
    await this.userService.getUserById(userId)
    const documents = await this.readFile();
    const docs = documents.find(d => d.id === id)
    if(!docs) throw new ApiErrors('Documento não encontrado.', StatusCodes.NOT_FOUND);
    const updatedDocuments = documents.filter(doc => doc.id !== id || doc.userId !== userId);
    if (documents.length === updatedDocuments.length) return false;

    await this.writeFile(updatedDocuments);
    return true;
  }
}

export default DocumentService;
