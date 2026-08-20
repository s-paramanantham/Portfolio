export interface ContactMessagePayloadDto {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactSubmissionResultDto {
  readonly success: boolean;
  readonly message: string;
  readonly submittedAt: string;
}
