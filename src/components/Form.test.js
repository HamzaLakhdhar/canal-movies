import React from 'react';
//import axios from 'axios';
import { render, screen } from '@testing-library/react';

import Form from './Form';

describe('Form', () => {
    //jest.mock('axios')
    test('API test', async () => {
        /*axios.get.mockImplementation(url => {
            if (url === 'https://api.themoviedb.org/3/search/movie?api_key=b2ee0afae7757bcb024f7dbdf1ab083a') {
                return Promise.resolve({ data: { page: '1' } });
            }
        })*/
        
        render(<Form />);
        const text = await screen.findByText('Bas');
        expect(text).toBeInTheDocument;
    });
});