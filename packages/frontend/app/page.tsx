import {UserComponent} from '@/components/User';

export default function Home() {
	return (
		<main>
			<UserComponent name="Denis" age={20}/>
		</main>
	);
}
