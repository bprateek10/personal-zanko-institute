export interface InstituteAdmin {
  id: string;
  email: string;
  first_name: string;
  last_name: string | null;
}

export interface Student extends InstituteAdmin {}

export interface Institute extends InstituteAdmin {}
