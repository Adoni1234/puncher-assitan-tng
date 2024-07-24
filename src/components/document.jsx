// src/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 2,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: '5px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableColor: {
    flexDirection: 'row',
    backgroundColor: '#8f8f8f'
  },
  tableCol: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableCell: {
    margin: 'auto',
    marginTop: 1,
    padding: 5,
    fontSize: 10,
  },
  image: {
    margin: '2px auto',
    width: '400px',
    height: '180px'
  },
  title: {
    fontSize: "30px",
    textAlign: "center"
  },

});

const MyDocument = ({ data, totalHours }) => (
  <Document>
  <Page size="A4" style={styles.page}>
    <Image
       style={styles.image}
       src={require("../Img/Transneg_logo.png")}
      />
      <Text style={styles.title}>Reporte de horas registradas</Text>
    <View style={styles.table}>
      <View style={styles.tableColor}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Nombre</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Fecha de entrada</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Fecha salida</Text>
        </View>
      </View>
      {data.map((c,index) => (
        <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{c.agentName}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{c.fecha_entrada}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{c.fecha_salida}</Text>
        </View>
      </View>
       )) }
        <Text style={styles.tableCell}>Total de Horas acomuladas:</Text>
        <Text style={styles.tableCell}>{totalHours}</Text>
    </View>
  </Page>
</Document>
);

export default MyDocument;
