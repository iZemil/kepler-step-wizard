import clsx from 'clsx';

import styles from './styles.module.scss';

interface IProps {
	title: string;
	className?: string;
	onNext: () => void;
}
export const Question = (props: IProps) => {
	const { title, className, onNext } = props;

	return (
		<div className={clsx(styles.question, className)}>
			<div className={styles.questionTitle}>{title}</div>
			<div className={styles.questionContent}>{777}</div>
			<button className={styles.button} onClick={onNext}>
				Ok
			</button>
		</div>
	);
};
