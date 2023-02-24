import styles from './styles.module.scss';

interface IProps {
	title: string;
	description: string;
	onStart: () => void;
}
export const Starter = (props: IProps) => {
	const { title, description, onStart } = props;

	return (
		<div className={styles.starter}>
			<div className={styles.starterTitle}>{title}</div>
			<div className={styles.starterDescription}>{description}</div>
			<button onClick={onStart}>Start</button>
		</div>
	);
};
