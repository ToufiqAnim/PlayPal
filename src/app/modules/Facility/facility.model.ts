import mongoose, { model, Schema } from 'mongoose';
import { FacilityModel, IFacility } from './facility.interface';

const FacilitySchema = new Schema<IFacility>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required.'],
      min: [0, 'Price per hour must be Greater than 0.'],
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);
FacilitySchema.pre('find', function (next) {
  this.find({
    isDeleted: false,
  });
  next();
});

FacilitySchema.statics.isFacilityExists = async function (name: string) {
  return await Facility.findOne({ name });
};
const Facility = model<IFacility, FacilityModel>('Facility', FacilitySchema);

export default Facility;
