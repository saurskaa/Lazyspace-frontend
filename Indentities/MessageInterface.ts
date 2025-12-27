export interface Message {
        id: string;              // unique per message
        text: string;
        from: string;
        replyTo?: {
          id: string;
          text: string;
          from: string;
        };
        createdAt: number;
      }

