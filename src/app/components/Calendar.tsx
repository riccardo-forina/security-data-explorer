import * as React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import { css, StyleSheet } from '@patternfly/react-styles';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const styles = StyleSheet.create({
  calendar: { 
    display: 'inline-flex',
    textAlign: 'center',
    border: `1px solid var(--pf-global--BorderColor--100)`,
    width: '6rem',
    height: 'auto'
  },
  month: {
    backgroundColor: `var(--pf-global--BackgroundColor--dark-200)`,
    color: `var(--pf-global--Color--light-100)`,
  },
  day: {
    fontSize: '3em'
  },
  time: {
    backgroundColor: `var(--pf-global--BackgroundColor--light-200)`,
    fontSize: `var(--pf-global--FontSize--sm)`,
    padding: `0.2em !important`
  }
});

export interface ICalendarProps {
  date: string;
}
export const Calendar: React.FunctionComponent<ICalendarProps> = ({ date }) => {
  const dateObj = new Date(date);
  const day = format(dateObj, 'd', { locale: enUS });
  const month = format(dateObj, 'MMM', { locale: enUS });
  const time = format(dateObj, 'p', { locale: enUS });
  return (
    <Stack className={css(styles.calendar)} component={'time'} dateTime={date}>
      <StackItem className={css(styles.month)}>{month}</StackItem>
      <StackItem className={css(styles.day)}>{day}</StackItem>
      <StackItem className={css(styles.time)}>{time} </StackItem>
    </Stack>
  );
};
