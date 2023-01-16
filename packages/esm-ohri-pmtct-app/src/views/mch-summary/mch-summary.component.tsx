import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';
import CurrentPregnancy from './tabs/current-pregnancy.component';
import PreviousPregnancies from './tabs/previous-pregnancies.component';
import Timeline from './tabs/timeline.component';
import HivExposedInfant from './tabs/hiv-exposed-infant.component';
import { usePatient } from '@openmrs/esm-framework';
import moment from 'moment';

const MaternalSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { patient } = usePatient(patientUuid);
  const age = moment().diff(patient?.birthDate, 'years');

  return (
    <div className={styles.tabContainer}>
      {age > 10 ? (
        <Tabs>
          <TabList contained>
            <Tab>{t('currentPregnancy', 'Current Pregnancy')}</Tab>
            <Tab>{t('previousPregnancies', 'Previous Pregnancies')}</Tab>
            <Tab>{t('timeline', 'Timeline')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CurrentPregnancy patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <PreviousPregnancies patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <Timeline patientUuid={patientUuid} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Tabs>
          <TabList contained>
            <Tab>{t('hivExposedInfant', 'HIV Exposed infant')}</Tab>
            <Tab>{t('timeline', 'Timeline')}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HivExposedInfant patientUuid={patientUuid} />
            </TabPanel>
            <TabPanel>
              <Timeline patientUuid={patientUuid} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
};

export default MaternalSummary;