'use client'

import { useState, useEffect } from 'react'

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from '@nextui-org/table'

async function getPartner() {
    const response = await fetch('http://localhost:3333/partners')
    return await response.json()
}

export default function Partners() {
    const [partners, setPartners] = useState<any>([])

    useEffect(() => {
        async function fetchData() {
            const data = await getPartner()
            setPartners(data)
        }

        fetchData()
    }, [])

    return (
        <Table aria-label='Lista de parceiros'>
            <TableHeader>
                <TableColumn>NOME</TableColumn>
                <TableColumn>CNPJ</TableColumn>
                <TableColumn>NÚMERO DE TELEFONE</TableColumn>
            </TableHeader>
            <TableBody>
                {partners.map((partner: any) => (
                        <TableRow key={partner.id}>
                            <TableCell>{partner.corporate_reason}</TableCell>
                            <TableCell>{partner.cnpj}</TableCell>
                            <TableCell>{partner.cellphone}</TableCell>
                        </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}