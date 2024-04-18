import mongoose from 'mongoose';
import { SpotifyConfiguration } from 'src/environments/environment';

export class MongooseService {
    private readonly mongoUrl: string;
  
    constructor() {
      this.mongoUrl = SpotifyConfiguration.MONGODB_URI;
    }
  
    async connect(): Promise<void> {
      try {
        await mongoose.connect(this.mongoUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // Additional options can be added here as needed
        } as mongoose.ConnectOptions); // Type assertion here
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    }
  
    disconnect(): void {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }