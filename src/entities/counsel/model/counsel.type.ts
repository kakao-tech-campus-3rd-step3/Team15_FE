export interface StartCounselResponse {
  sessionId: string;
  reply: string;
  step: 'ACTIVE' | 'ENDED';
}

export interface SendMessageRequest {
  message: string;
}

export interface SendMessageResponse {
  reply: string;
  step: 'ACTIVE' | 'ENDED';
}
