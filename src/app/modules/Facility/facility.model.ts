import mongoose, { Schema, Document } from 'mongoose';

interface IFacility extends Document {
  name: string;
  description: string;
  pricePerHour: string;
  location: string;
  isDeleted: boolean;
}

const FacilitySchema: Schema<IFacility> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: String, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

const Facility = mongoose.model<IFacility>('Facility', FacilitySchema);
export default Facility;
