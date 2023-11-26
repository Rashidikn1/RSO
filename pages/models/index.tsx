import clientPromise from "@/lib/mongodb";
import { GetServerSideProps } from "next";

type ModelProps = {
	id: string;
	model_name: string;
	name: string;
	parameters: {};
};

type Props = {
	accelerators: ModelProps[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	//

	const client = await clientPromise;
	const db = client.db();

	const accelerators = await db.collection("accelerators").find({}).toArray();

	let accelerators_data: { id: string }[] = [];

	if (accelerators) {
		accelerators_data = accelerators.map((accelerator) => {
			const { _id, accelerator_model_name, accelerator_name, accelerator_parameters } = accelerator;
			return {
				id: _id.toString(),
				model_name: accelerator_model_name,
				name: accelerator_name,
				parameters: accelerator_parameters,
			};
		});
	}

	return {
		props: {
			accelerators: accelerators_data,
		},
	};
};

export default function Home({ accelerators }: Props) {
	let createBooleanTicks = (values: {}) => {
		// create react component
		let ticks = [];

		for (let key in values) {
			ticks.push(
				<div key={key} className={"flex flex-row justify-between w-full"}>
					<p className={"text-center text-md "}>{key}</p>
					<p className={"text-center text-md "}>{createBooleanTick(values[key])}</p>
				</div>,
			);
		}

		return ticks;
	};
	let createBooleanTick = (value: boolean) => {
		return value ? "✓" : "✗";
	};
	return (
		<div className={"w-full flex justify-evenly"}>
			{accelerators.map((accelerator) => (
				<div key={accelerator.id} className={"flex flex-col w-1/6 bg-red-500 p-3"}>
					<p className={"text-center text-xl "}>{accelerator.model_name}</p>
					<p className={"text-center text-md "}>{accelerator.name}</p>
					<div className={"flex flex-col justify-evenly items-center"}>{createBooleanTicks(accelerator.parameters)}</div>
				</div>
			))}
		</div>
	);
}
