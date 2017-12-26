import { AdContent } from './adContent';
import { AdGroup } from './adGroup';
import { Product } from "./product";
import { CampaignListItem } from './campaignListItem';
import { AdWordsAd } from './AdWordsAd';
import { ProductGroup } from './productGroup';
import { AdwordsContent } from './adwordsContent';

interface IModelSetter {
  setProduct(data);
  setAdGroup(data);
  setCreatedAdGroup(data);
  setCreatedCampaignListItem(data);
  setCampaignListItem(data);
  replacer(contentProduct: AdWordsAd, product: Product, setLenght: boolean);
  setProductGroup(data);
  setAdwordAd(product: Product, adContent: AdContent);
}

export class ModelSetter implements IModelSetter {
    url: string = "http://www.nolleren.org";

    setProduct(data) : Product {
        let product: Product = {
            id: data[0].productLos[0].id,
            productNumber: data[0].productLos[0].productNumber,
            productName: data[0].productLos[0].productName,
            logicName: data[0].productLos[0].logicName,
            description: data[0].productLos[0].description,
            descriptionShort: data[0].productLos[0].descriptionShort,
            adGroupId: data[0].productLos[0].adGroupLoId,
            isChecked: false,
            keyValuePairs: []
        };
        for(let i = 0; i < data[0].productLos[0].keyValuePairs.length; i++){
            product.keyValuePairs.push({
            key: data[0].productLos[0].keyValuePairs[i].key,
            value: data[0].productLos[0].keyValuePairs[i].value
          });
        }
        return product;
    }

    setAdGroup(data) : AdGroup {
        let adgroup: AdGroup = {
            adGroupId: data.id,
            name: data.name,
            keyWords: "",
            campaignId: data.campaignId
        }
        return adgroup;
    }

    setCreatedAdGroup(data) : AdGroup {
      let adgroup: AdGroup = {
        adGroupId: data.value[0].id,
        name: data.value[0].name,
        keyWords: "",
        campaignId: data.value[0].campaignId
    }
    return adgroup;
    }

    setCreatedCampaignListItem(data) : CampaignListItem {
        let campaignListItem: CampaignListItem = {
            id: data.value[0].id,
            name: data.value[0].name,
            startDate: data.value[0].startDate,
            endDate: data.value[0].endDate,
            microAmount: data.value[0].budget.amount.microAmount
          };
          return campaignListItem;
    }

    setCampaignListItem(data){
        let campaignListItem: CampaignListItem = {
            id: data.id,
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            microAmount: data.budget.amount.microAmount
          };
          return campaignListItem;
    }
    
    replacer(contentProduct: AdWordsAd, product: Product, setLenght: boolean){
        if(contentProduct.adContent.headLinePart1 !== undefined) {
            for(let i = 0; i < product.keyValuePairs.length; i++){
                contentProduct.adContent.headLinePart1 = contentProduct.adContent.headLinePart1.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
            }
        }        
        if(contentProduct.adContent.headLinePart2 !== undefined) {
            for(let i = 0; i < product.keyValuePairs.length; i++){
                contentProduct.adContent.headLinePart2 = contentProduct.adContent.headLinePart2.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
            }
        }
        if(contentProduct.adContent.path1 !== undefined){
          for(let i = 0; i < product.keyValuePairs.length; i++){
            contentProduct.adContent.path1 = contentProduct.adContent.path1.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
          }
        }
        if(contentProduct.adContent.path2 !== undefined){
          for(let i = 0; i < product.keyValuePairs.length; i++){
            contentProduct.adContent.path2 = contentProduct.adContent.path2.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
          }
        } 
        if(contentProduct.adContent.description !== undefined) {
            for(let i = 0; i < product.keyValuePairs.length; i++){
                contentProduct.adContent.description = contentProduct.adContent.description.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
              }
        }       
        if(setLenght){
            if(contentProduct.adContent.headLinePart1 !== undefined) contentProduct.adContent.headLinePart1 = contentProduct.adContent.headLinePart1.substring(0, 30);
            if(contentProduct.adContent.headLinePart2 !== undefined) contentProduct.adContent.headLinePart2 = contentProduct.adContent.headLinePart2.substring(0, 30);
            if(contentProduct.adContent.path1 !== undefined) contentProduct.adContent.path1 = contentProduct.adContent.path1.substring(0, 15);
            if(contentProduct.adContent.path2 !== undefined) contentProduct.adContent.path2 = contentProduct.adContent.path2.substring(0, 15);
            if(contentProduct.adContent.description !== undefined) contentProduct.adContent.description = contentProduct.adContent.description.substring(0, 80);
        }     
    }

    setProductGroup(data){
        let productGroup: ProductGroup = {
            id: data.id,
            groupName: data.groupName,
            products: [],
          };
          for(let j = 0; j < data.productLos.length; j++){
            productGroup.products.push({
              id: data.productLos[j].id,
              productNumber: data.productLos[j].productNumber,
              productName: data.productLos[j].productName,
              logicName: data.productLos[j].logicName,
              description: data.productLos[j].description,
              descriptionShort: data.productLos[j].descriptionShort,
              adGroupId: data.productLos[j].adGroupLoId,
              isChecked: false,
              keyValuePairs: []
            });
  
            for(let h = 0; h < data.productLos[j].keyValuePairs.length; h++){
              productGroup.products[j].keyValuePairs.push({
                key: data.productLos[j].keyValuePairs[h].key,
                value: data.productLos[j].keyValuePairs[h].value
              });
            }             
        }
        return productGroup;
    }

    setAdwordAd(product: Product, adContent: AdContent) : AdWordsAd {
        let adwordAd: AdWordsAd = {
            adContent: {
              headLinePart1: adContent.headLinePart1,
              headLinePart2: adContent.headLinePart2,
              path1: adContent.path1,
              path2: adContent.path2,
              description: adContent.description
            },
            productId: product.id,
            finalUrl: [this.url + product.logicName]
          };
          return adwordAd;
    }

}