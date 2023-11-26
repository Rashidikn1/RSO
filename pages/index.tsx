import clientPromise from "@/lib/mongodb";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

type Props = {
	patients: Patient[];
	schedules: Schedule[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const client = await clientPromise;
	const db = client.db();

	const patients = await db.collection("patients").find({}).toArray();
	const schedules = await db.collection("schedules").find({}).toArray();

	return {
		props: {
			patients: patients,
			schedules: schedules,
		},
	};
};

export default function Home({ patients, schedules }: Props) {
	const [patientList, setPatientList] = React.useState(patients);

	useEffect(() => {
		setPatientList(patients);
		if (patients.length == 0) {
			setPatientList(["No Patients"]);
		}
	}, [patients]);
	return (
		<div className={"w-full h-full flex flex-row"}>
			<section className={"h-full w-1/5 bg-red-500 flex flex-col"} id={"patientList"}>
				<button className={"w-full h-10 bg-blue-500 text-white"}>Add Patient</button>
				<div className={"flex bg-white text-black items-center justify-center py-2 flex-1"}>
					{patientList.map((patient) => {
						return <p key={patient}>{patient}</p>;
					})}
				</div>
			</section>
			<section className={"h-full flex-1 bg-red-500"} id={"scheduleList"}>
				<p>Scheduler Frame</p>
			</section>
		</div>
	);
}
