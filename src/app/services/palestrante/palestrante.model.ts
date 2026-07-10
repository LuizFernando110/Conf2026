export interface Palestrante {
  id: number;
  nome: string;
  bio: string;
  fotoUrl: string;
  empresa?: string;
  tecnologias: string[];
}