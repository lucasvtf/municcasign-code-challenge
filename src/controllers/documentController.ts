import { Request, Response, NextFunction } from 'express';
import DocumentService from '../services/documentService';
import IDocument from '../interfaces/IDocument';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';

class DocumentController {
  private service: DocumentService;

  constructor() {
    this.service = new DocumentService(new UserService());
  }

  public getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {userId} = req.params;
      const documents = await this.service.getAllDocuments(+userId);
      return res.status(StatusCodes.OK).json(documents);
    } catch (error) {
      next(error);
    }
  };

  public getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { docId, userId } = req.params;
      const document = await this.service.getDocumentById(+docId, +userId);
      return res.status(StatusCodes.OK).json(document);
    } catch (error) {
      next(error);
    }
  };

  public createDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
      const newDocument: IDocument = { ...req.body, userId: +userId };
      const createdDocument = await this.service.createDocument(newDocument);
      return res.status(StatusCodes.CREATED).json(createdDocument);
    } catch (error) {
      next(error);
    }
  };

  public updateDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { docId, userId } = req.params;
      const updatedDocument = await this.service.updateDocument({id: +docId, ...req.body, userId: +userId });
      return res.status(StatusCodes.OK).json(updatedDocument);
    } catch (error) {
      next(error);
    }
  };

  public deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { docId, userId } = req.params;
      const deleted = await this.service.deleteDocument(+docId, +userId);
      if (deleted) {
        return res.status(StatusCodes.NO_CONTENT).send();
    } else {
        return res.status(StatusCodes.FORBIDDEN).send();
    }
    } catch (error) {
      next(error);
    }
  };
}

export default DocumentController;
