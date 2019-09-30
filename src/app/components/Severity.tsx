import * as React from 'react';
import { css, StyleSheet } from '@patternfly/react-styles';

const styles = StyleSheet.create({
  severity: { fontWeight: 'bold' },
  low: { color: `var(--pf-global--warning-color--200)` },
  moderate: { color: `var(--pf-global--warning-color--100)` },
  important: { color: `var(--pf-global--danger-color--100)` }
});

export interface ISeverityProps {
  severity: string;
}

export const Severity: React.FunctionComponent<ISeverityProps> = ({ severity }) => {
  const severityValue = severity.toLowerCase();
  return (
    <span
      className={css(
        styles.severity,
        severityValue === 'low' && styles.low,
        severityValue === 'moderate' && styles.moderate,
        severityValue === 'important' && styles.important
      )}
    >
      {severity}
    </span>
  );
};
