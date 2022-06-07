import {faker} from '@faker-js/faker';
import {fetchRandomImages, fetchPetsByPaging} from '@shared/apis/dogApi';
import {PetType} from '@shared/apis/pet-store';
import {IconType, NFTPagingType, NFTType} from './NFTApiTypes';

const IconsPageSize = 25;
const NftsPageSize = 20;

export async function queryIcons(): Promise<IconType[]> {
  const data = await fetchRandomImages(IconsPageSize);

  return data.map(
    it =>
      ({
        id: faker.datatype.uuid(),
        title: faker.animal.dog(),
        image: it,
      } as IconType),
  );
}

export async function queryNfts({pageParam = 0}): Promise<NFTPagingType> {
  const pagingData = await fetchPetsByPaging({
    pageIndex: pageParam,
    pageSize: NftsPageSize,
  });
  const items: NFTType[] = pagingData.items.map((it: PetType) => {
    return {
      ...it,
      motto: faker.lorem.lines(1),
      liked: faker.datatype.number({min: 100, max: 10000}),
    };
  });

  return {nextPageIndex: pagingData.nextPageIndex, items};
}
