import { promises as fs } from 'fs';
import path from 'path';
import IUser from '../interfaces/IUser';
import ApiErrors from '../utils/apiErros';
import { StatusCodes } from 'http-status-codes';

const usersFilePath = path.join(__dirname, '../database', 'users.json');

class UserService {
 
  private async readFile(): Promise<IUser[]> {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  }

  private async writeFile(users: IUser[]): Promise<void> {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  public async getAllUsers(): Promise<IUser[]> {
    return this.readFile();
  }

  public async getUserById(id: number): Promise<IUser | undefined> {
    const users = await this.readFile();
    const user = users.find(user => user.id === id);
    if(!user) throw new ApiErrors('Usuáro não encontrado', StatusCodes.NOT_FOUND)
    return user 
  }


  public async createUser(newUser: IUser): Promise<IUser> {
    const users = await this.readFile();

    const emailExists = users.find(u => u.email === newUser.email)

    if (emailExists)
      throw new ApiErrors(
        'Email já registrado.',
        StatusCodes.FORBIDDEN,
      );

    const id = users.length ? users[users.length - 1].id + 1 : 1;
    
    const userWithIdFirst: IUser = {
      id,
      ...newUser 
    };

    users.push(userWithIdFirst);
    await this.writeFile(users);
  
    return userWithIdFirst;
  }

  public async updateUser(id: number, updatedData: Partial<IUser>): Promise<IUser | null> {
    const users = await this.readFile();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) throw new ApiErrors('Usuáro não encontrado', StatusCodes.NOT_FOUND);

    const updatedUser = { ...users[userIndex], ...updatedData };
    users[userIndex] = updatedUser;
    await this.writeFile(users);
    return updatedUser;
  }

  public async deleteUser(id: number): Promise<boolean> {
    await this.getUserById(id)
    const users = await this.readFile();
    const updatedUsers = users.filter(user => user.id !== id);
    
    if (users.length === updatedUsers.length) return false;

    await this.writeFile(updatedUsers);
    return true;
  }
}

export default UserService