import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { db } from '../../../data/db'
import './styles.css' // Import your CSS file

const calculateAge = (birthDate) => {
  const today = new Date()
  const birthDateObj = new Date(birthDate)
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const monthDifference = today.getMonth() - birthDateObj.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }

  return age
}

const getAgeColor = (age) => {
  if (age < 13) {
    return '#ffcccc' // Light red
  } else if (age < 20) {
    return '#ffeb99' // Light yellow
  } else if (age < 65) {
    return '#ccffcc' // Light green
  } else {
    return '#ccccff' // Light blue
  }
}

const UsersList = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Striped rows</small>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Age</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Avatar</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {db.map((user, index) => {
                  const age = calculateAge(user.birthday)
                  const rowColor = getAgeColor(age)
                  return (
                    <CTableRow key={user.id} style={{ backgroundColor: rowColor }}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{`${user.firstName} ${user.lastName}`}</CTableDataCell>
                      <CTableDataCell>{age}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={`/src/assets/images/iam/${user.image}.jpg`}
                          alt={`${user.firstName} ${user.lastName}`}
                          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsersList
