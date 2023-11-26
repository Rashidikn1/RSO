import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

async function add_patient(req: NextRequest, res: NextResponse) {
	const newPatient = req.body;
	const client = await clientPromise;

	const result = await client.db().collection("patients").insertOne(newPatient);

	console.log(result);
	res.status(200).json(result);
	return res;
}
