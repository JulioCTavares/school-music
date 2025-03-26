export interface BaseRepository<T, U> {
  findAll(): Promise<T[]>;
  findById(id: string | number): Promise<T | null>;
  create(data: U): Promise<T>;
  update(id: string | number, data: Partial<U>): Promise<T>;
  delete(id: string | number): Promise<boolean>;
}
