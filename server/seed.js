require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Message = require('./models/Message');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Seeding database...\n');

    // Seed Admin
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'admin',
        password: 'admin123'
      });
      await admin.save();
      console.log('✅ Admin created - Username: admin, Password: admin123');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Seed Doctors
    const doctors = [
      { name: 'Ganesh', email: 'ganesh@gmail.com', password: 'ganesh123', consultationFee: 550, specialization: 'Pediatrician' },
      { name: 'Dinesh', email: 'dinesh@gmail.com', password: 'dinesh123', consultationFee: 700, specialization: 'General' },
      { name: 'Amit', email: 'amit@gmail.com', password: 'amit123', consultationFee: 1000, specialization: 'Cardiologist' },
      { name: 'ashok', email: 'ashok@gmail.com', password: 'ashok123', consultationFee: 500, specialization: 'General' },
      { name: 'arun', email: 'arun@gmail.com', password: 'arun123', consultationFee: 600, specialization: 'Cardiologist' },
      { name: 'Kumar', email: 'kumar@gmail.com', password: 'kumar123', consultationFee: 800, specialization: 'Pediatrician' },
      { name: 'Abbis', email: 'abbis@gmail.com', password: 'abbis123', consultationFee: 1500, specialization: 'Neurologist' },
      { name: 'Tiwary', email: 'tiwary@gmail.com', password: 'tiwary123', consultationFee: 450, specialization: 'Pediatrician' }
    ];

    for (const docData of doctors) {
      const existing = await Doctor.findOne({ email: docData.email });
      if (!existing) {
        const doctor = new Doctor(docData);
        await doctor.save();
        console.log(`✅ Doctor created - ${docData.name} (${docData.email})`);
      }
    }

    // Seed Patients
    const patients = [
      { firstName: 'Ram', lastName: 'Kumar', email: 'ram@gmail.com', phone: '9876543210', password: 'ram123', gender: 'Male' },
      { firstName: 'Alia', lastName: 'Bhatt', email: 'alia@gmail.com', phone: '8976897689', password: 'alia123', gender: 'Female' },
      { firstName: 'Shahrukh', lastName: 'Khan', email: 'shahrukh@gmail.com', phone: '8976898463', password: 'shahrukh123', gender: 'Male' },
      { firstName: 'Kishan', lastName: 'Lal', email: 'kishansmart0@gmail.com', phone: '8838489464', password: 'kishan123', gender: 'Male' },
      { firstName: 'Gautam', lastName: 'Shankararam', email: 'gautam@gmail.com', phone: '9070897653', password: 'gautam123', gender: 'Male' },
      { firstName: 'Sushant', lastName: 'Singh', email: 'sushant@gmail.com', phone: '9059986865', password: 'sushant123', gender: 'Male' },
      { firstName: 'Nancy', lastName: 'Deborah', email: 'nancy@gmail.com', phone: '9128972454', password: 'nancy123', gender: 'Female' },
      { firstName: 'Kenny', lastName: 'Sebastian', email: 'kenny@gmail.com', phone: '9809879868', password: 'kenny123', gender: 'Male' },
      { firstName: 'William', lastName: 'Blake', email: 'william@gmail.com', phone: '8683619153', password: 'william123', gender: 'Male' },
      { firstName: 'Peter', lastName: 'Norvig', email: 'peter@gmail.com', phone: '9609362815', password: 'peter123', gender: 'Male' },
      { firstName: 'Shraddha', lastName: 'Kapoor', email: 'shraddha@gmail.com', phone: '9768946252', password: 'shraddha123', gender: 'Female' }
    ];

    for (const patData of patients) {
      const existing = await Patient.findOne({ email: patData.email });
      if (!existing) {
        const patient = new Patient(patData);
        await patient.save();
        console.log(`✅ Patient created - ${patData.firstName} ${patData.lastName} (${patData.email})`);
      }
    }

    // Seed Contact Messages
    const messages = [
      { name: 'Anu', email: 'anu@gmail.com', phone: '7896677554', message: 'Hey Admin' },
      { name: 'Viki', email: 'viki@gmail.com', phone: '9899778865', message: 'Good Job, Pal' },
      { name: 'Ananya', email: 'ananya@gmail.com', phone: '9997888879', message: 'How can I reach you?' },
      { name: 'Aakash', email: 'aakash@gmail.com', phone: '8788979967', message: 'Love your site' },
      { name: 'Mani', email: 'mani@gmail.com', phone: '8977768978', message: 'Want some coffee?' },
      { name: 'Karthick', email: 'karthi@gmail.com', phone: '9898989898', message: 'Good service' },
      { name: 'Abbis', email: 'abbis@gmail.com', phone: '8979776868', message: 'Love your service' },
      { name: 'Asiq', email: 'asiq@gmail.com', phone: '9087897564', message: 'Love your service. Thank you!' }
    ];

    for (const msgData of messages) {
      const existing = await Message.findOne({ email: msgData.email });
      if (!existing) {
        const message = new Message(msgData);
        await message.save();
        console.log(`✅ Message created - ${msgData.name}`);
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('\nSample Doctor:');
    console.log('  Name: Ganesh');
    console.log('  Password: ganesh123');
    console.log('\nSample Patient:');
    console.log('  Email: kishansmart0@gmail.com');
    console.log('  Password: kishan123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
