export class GenericResponse {
  message?: string;
  error?: string;
  data?: any;

  constructor(data: {
    message?: string,
    error?: string,
    data?: any
  }) {
    this.message = data.message;
    this.error = data.error;
    this.data = data.data;
  }
}
