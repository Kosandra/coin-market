import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import type { MouseEventHandler } from 'react';

import styles from './styles.module.scss';

type Props = {
	id?: string;
	title: ReactNode | string;
	onClose?: () => void;
	children: React.ReactNode | React.ReactNode[];
};

const ModalWindow = (props: Props) => {
	const { title, onClose, children, id } = props;

	const rootRef = useRef<HTMLDivElement>(null);
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && rootRef.current === target) {
				onClose?.();
			}
		};

		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('click', handleWrapperClick);
		window.addEventListener('keydown', handleEscapePress);

		return () => {
			window.removeEventListener('click', handleWrapperClick);
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> =
		useCallback(() => {
			onClose?.();
		}, [onClose]);

	return isMounted ? (
		<div className={styles.wrap} ref={rootRef} data-testid='wrap' id={id}>
			<div className={styles.content}>
				<button
					type='button'
					className={styles.closeButton}
					onClick={handleClose}
					data-testid='modal-close-button'
				>
					&times;
				</button>
				<p className={styles.title}>{title}</p>
				{children}
			</div>
		</div>
	) : null;
};

export default ModalWindow;
