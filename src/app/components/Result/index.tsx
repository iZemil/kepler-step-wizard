import styles from './styles.module.scss';

interface IProps {
	onRestart: () => void;
}
export const Result = (props: IProps) => {
	const { onRestart } = props;

	return (
		<div className={styles.result}>
			<div>Gongrats🎉</div>
			<button onClick={onRestart}>Restart</button>
		</div>
	);
};
