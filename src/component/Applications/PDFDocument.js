import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Optional font registration
Font.register({
  family: 'Helvetica-Bold',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v6/1Ptug8zYS_SKggPNyCMIT5lu.woff2' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    border: '1px solid black',
    padding: 6,
    color: 'black',
  },
  section: {
    marginBottom: 12,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
    borderBottom: '1px solid #ccc',
    paddingBottom: 2,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: '45%',
  },
  value: {
    width: '55%',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  fieldContainer: {
    width: '48%',
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  fieldValue: {
    fontSize: 11,
  },
});

// Single field per row
const FieldRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || '—'}</Text>
  </View>
);

// Two fields per row
const TwoFieldRow = ({ label1, value1, label2, value2 }) => (
  <View style={styles.twoColumnRow}>
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label1}:</Text>
      <Text style={styles.fieldValue}>{value1 || '—'}</Text>
    </View>
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label2}:</Text>
      <Text style={styles.fieldValue}>{value2 || '—'}</Text>
    </View>
  </View>
);

const PDFDocument = ({ application }) => {
  const personal = application?.personalInfo || {};
  const loan = application?.loanDetails || {};
  const family = application?.familyInfo || {};
  const employment = application?.employmentInfo || {};
  const property = application?.propertyInvestment || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Loan Application Form</Text>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <FieldRow label="Full Name" value={personal.applicantName} />
          <TwoFieldRow
            label1="Date of Birth"
            value1={personal.applicantDob}
            label2="Gender"
            value2={personal.applicantGender}
          />
          <TwoFieldRow
            label1="Mobile"
            value1={personal.applicantMobile}
            label2="Email"
            value2={personal.applicantEmail}
          />
          <TwoFieldRow
            label1="Nationality"
            value1={personal.applicantNationality}
            label2="PAN Number"
            value2={personal.pan}
          />
          <TwoFieldRow
            label1="Address"
            value1={personal.applicantAddress}
            label2="PIN Code"
            value2={personal.applicantPin}
          />
        </View>

        {/* Family Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Information</Text>
          <TwoFieldRow label1="Father's Name" value1={family.fatherName} label2="Father's DOB" value2={family.fatherDOB} />
          <TwoFieldRow label1="Father's Mobile" value1={family.fatherMobile} label2="Father's Email" value2={family.fatherEmail} />
          <TwoFieldRow label1="Mother's Name" value1={family.motherName} label2="Mother's DOB" value2={family.motherDOB} />
          <TwoFieldRow label1="Mother's Mobile" value1={family.motherMobile} label2="Mother's Email" value2={family.motherEmail} />
          <TwoFieldRow label1="Marital Status" value1={family.maritalStatus} label2="Children Count" value2={family.childrenCount} />
          <TwoFieldRow label1="Spouse's Name" value1={family.spouseName} label2="Spouse's DOB" value2={family.spouseDOB} />
          <TwoFieldRow label1="Spouse's Mobile" value1={family.spouseMobile} label2="Spouse's Email" value2={family.spouseEmail}/>
        
        </View>

        {/* Employment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employment Information</Text>
          <TwoFieldRow label1="Income Source" value1={employment.incomeSource} label2="Employer Name" value2={employment.employerOrBusinessName} />
          <TwoFieldRow label1="Address" value1={employment.employerAddress} label2="Work Email" value2={employment.workEmail} />
        </View>

        {/* Loan Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loan Details</Text>
          <TwoFieldRow label1="Loan Type" value1={loan.loanType} label2="Loan Amount" value2={loan.loanAmount ? `Rs. ${loan.loanAmount}` : '—'} />
          <TwoFieldRow label1="EMI Amount" value1={loan.emiAmount ? `Rs. ${loan.emiAmount}` : '—'}  />
        </View>

        {/* Property Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Details</Text>
          <TwoFieldRow
            label1="Investment Amount"
            value1={property.investmentAmount ? `Rs. ${property.investmentAmount}` : ''}
            label2="Investment Type"
            value2={property.investmentType}
          />
        </View>

        {/* Credit Score */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Score</Text>
          <FieldRow label="Credit Score" value={application?.creditScore || '—'} />
        </View>

        {/* Signature */}
        <View style={{ marginTop: 40, borderTop: '1px solid #ccc', paddingTop: 10 }}>
          <Text>Applicant Signature: ______________________</Text>
          <Text>Date: ______________________</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
