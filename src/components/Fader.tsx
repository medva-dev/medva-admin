import type { ReactNode } from 'react';
import FadeIn from 'react-fade-in';

import { fadeInDelay } from '../const/defaults';

interface Props {
	children: ReactNode;
}

export default function Fader({ children }: Props) {
	return <FadeIn transitionDuration={fadeInDelay}>{children}</FadeIn>;
}
