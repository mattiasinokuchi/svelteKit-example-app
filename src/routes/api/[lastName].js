/*import faker from "faker";

export async function get({ params }) {
    const { lastName } = params;
    return {
        body: {
            lastName,
            firstName: faker.name.firstName(),
            avatar: `https://avatars.dicebear.com/api/human/${lastName}.svg`,
            title: faker.name.title(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
        },
    };
}*/

import supabase from '$lib/db';

export async function get({ params }) {
    const { lastName } = params;
    const response = await supabase.from('customers').select(`*`).match({lastName: lastName});
    return {
        body: {
            lastName,
            firstName: response.data[0].firstName,
            title: response.data[0].title
        },
    };
}