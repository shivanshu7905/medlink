import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    await User.create({ name, email, password, role: role ?? 'patient' });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error('[register]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
