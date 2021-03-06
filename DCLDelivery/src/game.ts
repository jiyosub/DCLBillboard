import { createChannel } from "../node_modules/decentraland-builder-scripts/channel";
import { createInventory } from "../node_modules/decentraland-builder-scripts/inventory";
import Script1 from "../Image Billboard Black/src/item";
import { getBanners } from "./BillboardListener";
import * as config from "./config";

const _scene = new Entity("_scene");
engine.addEntity(_scene);
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
_scene.addComponentOrReplace(transform);

const entity = new Entity("entity");
engine.addEntity(entity);
entity.setParent(_scene);
const gltfShape = new GLTFShape(
  "Floor/FloorBaseGrass_01/FloorBaseGrass_01.glb"
);
gltfShape.withCollisions = true;
gltfShape.isPointerBlocker = true;
gltfShape.visible = true;
entity.addComponentOrReplace(gltfShape);
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
entity.addComponentOrReplace(transform2);

const imageBillboardBlack = new Entity("imageBillboardBlack");
engine.addEntity(imageBillboardBlack);
imageBillboardBlack.setParent(_scene);
const transform3 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
});
imageBillboardBlack.addComponentOrReplace(transform3);

const channelId = Math.random().toString(16).slice(2);
const channelBus = new MessageBus();
const inventory = createInventory(UICanvas, UIContainerStack, UIImage);
const options = { inventory };

const script1 = new Script1();

// get current banner
let bannerImage = "";
const TARGET_ID = "DCL1";
const flightSummary = getBanners(TARGET_ID);
flightSummary.then((fs) => {
// @ts-ignore
    const nowDate = Date.now();
    fs.forEach(row => {
      if (row.startDate <= nowDate && row.endDate >= nowDate) {
        bannerImage = row.hash;
      }
    });
    // @ts-ignore
    script1.init(options);
    script1.spawn(
      imageBillboardBlack,
      {
        image:
          config.INFURA_URL + bannerImage
      },
      createChannel(channelId, imageBillboardBlack, channelBus)
    );
  }
);


