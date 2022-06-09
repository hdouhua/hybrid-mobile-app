import {faker} from '@faker-js/faker';
import {fetchPetsByPaging} from '@shared/apis/catApi';

export interface NftType {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  symbol?: string;
}

export async function queryNfts(count = 20) {
  return fetchPetsByPaging({pageSize: count}).then(data => {
    const cats: NftType[] = data.items.map(
      it =>
        ({
          ...it,
          description: faker.lorem.sentences(),
          price: faker.datatype.number({min: 10, max: 1000}),
        } as NftType),
    );
    return cats;
  });
}
