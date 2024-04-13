import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  profession: String,
  linkedInProfile: String,
  companyName: String, 
  howHeard: String
});

const ContactFormModel = mongoose.model('Contact', contactSchema);

export default ContactFormModel;
