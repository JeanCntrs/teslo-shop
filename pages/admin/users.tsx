import { PeopleOutline } from "@mui/icons-material";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { NextPage } from "next";
import { AdminLayout } from "../../components/layouts";
import useSWR from 'swr';
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";
import { useState, useEffect } from 'react';

const UsersPage: NextPage = () => {
    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data])


    if (!data && !error) return (<></>);

    const handleRoleUpdated = async (userId: string, newRole: string) => {
        const previousUsers = users.map(user => ({...user}));
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        setUsers(updatedUsers);

        try {
            await tesloApi.put('/admin/users', { userId, role: newRole });
        } catch (error) {
            console.log('error in handleRoleUpdated', error);

            setUsers(previousUsers);
        }
    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Fullname', width: 300 },
        {
            field: 'role',
            headerName: 'Rol',
            width: 300,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Select
                        value={row.role}
                        label='Rol'
                        sx={{ width: '300px' }}
                        onChange={(event) => handleRoleUpdated(row.id, event.target.value)}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        }
    ];

    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }));

    return (
        <AdminLayout
            title='Users'
            subTitle='Users maintainer'
            icon={<PeopleOutline />}
        >
            <Grid container className='fadeIn'>
                <Grid item sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    );
}

export default UsersPage;