import { observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { Box, Button, Typography } from "@mui/material";

const counter = observer(function Counter() {
	const { counterStore } = useStore();

	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}>
			<Box sx={{ width: "60%" }}>
				<Typography
					variant='h4'
					gutterBottom>
					{counterStore.title}
				</Typography>
				<Typography
					variant='h5'
					gutterBottom>
					{counterStore.count}
				</Typography>

				<Button
					onClick={() => counterStore.decrement()}
					title='Decrement'
					color='error'
					variant='contained'>
					Decrement
				</Button>
				<Button
					onClick={() => counterStore.increment()}
					title='Increment'
					color='success'
					variant='contained'>
					Increment
				</Button>
				<Button
					onClick={() => counterStore.increment(5)}
					title='Increment'
					color='primary'
					variant='contained'>
					Increment by 5
				</Button>
			</Box>
			<Box sx={{ width: "40%" }}>
				{counterStore.events.map((e: string) => (
					<Typography variant='h5'>{e}</Typography>
				))}
				;
			</Box>
		</Box>
	);
});

export default counter;
