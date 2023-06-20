import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Image, ScrollView, Stack} from 'native-base';
import {
  ArticleCollectionPlug,
  ArticleHeading,
  ArticleList,
  ArticleParagraph,
  ArticleQuote,
  ArticleStorePlug,
  ArticleStoreProductPlug,
  ArticleUploadImage,
  IconOnlyHeader,
} from '../components/molecules';
import bell from '../assets/icons/bell.png';
import share from '../assets/icons/share.png';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {useAppSelector} from '../store/hooks';
import {useArticleDetailQuery} from '../store/services';

export function ArticleDetailScreen() {
  const {selectedArticleId} = useAppSelector(state => state.browse);
  const {data, isLoading} = useArticleDetailQuery(selectedArticleId);

  console.log(
    '🚀 ~ file: ArticleDetailScreen.tsx:22 ~ ArticleDetailScreen ~ data:',
    data?.data?.sections,
  );

  const Item = ({item}) => {
    switch (item?.type) {
      case 'Heading':
        return (
          <ArticleHeading
            title={item?.header?.english}
            type={item?.headingType}
          />
        );
        break;
      case 'Paragraph':
        return <ArticleParagraph body={item?.paragraph?.english} />;
        break;
      case 'UploadImage':
        return (
          <ArticleUploadImage
            url={item?.article_body_image?.url}
            caption={item?.caption?.english}
          />
        );
        break;
      case 'List':
        return <ArticleList data={item?.lists} type={item?.listType} />;
        break;
      case 'Quote':
        return (
          <ArticleQuote
            quote={item?.quote?.english}
            author={item?.author?.english}
          />
        );
        break;
      case 'CollectionPlug':
        return (
          <ArticleCollectionPlug
            title={item?.curated_product?.title?.english}
            imageUrl={item?.curated_product?.collection_image?.url}
          />
        );
        break;
      case 'StorePlug':
        return (
          <ArticleStorePlug
            title={item?.store_branch?.store?.name?.english}
            imageUrl={item?.store_branch?.cover_image?.url}
            distance={item?.store_branch?.store?.name?.english}
            rating={item?.store_branch?.store?.name?.english}
          />
        );
        break;
      case 'StoreProductPlug':
        return (
          <ArticleStoreProductPlug
            title={
              item?.store_product?.product_variant?.product?.title?.english
            }
            imageUrl={item?.store_product?.product_variant?.product_image?.url}
            price={item?.store_product?.price}
          />
        );
        break;

      default:
        break;
    }
  };

  return (
    <Stack bg={colors.pureWhite} flex={1}>
      <Stack px={5} pt={2} pb={4}>
        <IconOnlyHeader
          iconL={bell}
          iconR={share}
          onPressL={() => {
            console.log('cat');
          }}
          onPressR={() => {}}
        />
      </Stack>
      <ScrollView>
        <Image
          source={{
            uri: data?.data?.cover_image?.url,
          }}
          alt="article"
          w={'100%'}
          h={250}
        />
        <Stack px={5} pt={4} space={1}>
          <Text style={[fonts.heading6, {fontSize: 24}]} pt={1}>
            {data?.data?.title?.english}
            Another benefit of exercise: Eye comfort
          </Text>
          <Text style={fonts.caption}>Exercise & Fitness</Text>
          <Text style={fonts.button2}>
            {data?.data?.reading_time_english} read{'  '}
            {
              new Date(data?.data?.published_at).toDateString().split(' ')[1]
            }{' '}
            {new Date(data?.data?.published_at).toDateString().split(' ')[2]}
          </Text>
          <FlatList
            data={data?.data?.sections}
            renderItem={Item}
            keyExtractor={item => item.id}
          />
        </Stack>
      </ScrollView>
    </Stack>
  );
}
