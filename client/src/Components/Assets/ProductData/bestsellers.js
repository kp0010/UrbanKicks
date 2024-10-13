let bestsellers = [
    {
        id: 1,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d35c686b-f9e6-49cb-9381-9bcc79388e72/AIR+JORDAN+1+HIGH+G.png',
        title: 'Air Jordan I High G',
        price: 16995,
        subtitle: "Men's Golf Shoes",
        description: 'Feel unbeatable, from the tee box to the final putt. Inspired by one of the most iconic sneakers of all time, the Air Jordan 1 G is an instant classic on the course. With Air cushioning underfoot, a Wings logo on the heel and an integrated traction pattern to help you power through your swing, it delivers all the clubhouse cool of the original AJ1—plus everything you need to play 18 holes in comfort.',
        gender: 'men',
        category: 'jordan',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 2,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b2c491ce-b309-4fa9-8208-26e5d8fad1b4/JORDAN+JUMPMAN+SLIDE.png',
        title: 'Jordan Jumpman',
        price: 3195,
        subtitle: "Men's Slides",
        description: 'Slide in and go. Enjoy the cushioning of thick, lightweight foam for beach days or post-game hangouts.',
        gender: 'men',
        category: 'jordan',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 3,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7dd5d00b-b588-485b-9e30-147cd30ade3a/JORDAN+ROAM.png',
        title: 'Jordan Roam',
        price: 4195,
        subtitle: 'Slides',
        description: 'Slip in and be on your way in seconds with the Jordan Roam. Made from one solid piece of flexible yet sturdy foam, these slides offer cushioned comfort with every step. The rubber on the forefoot and heel gives you traction where you need it most, while vents on the upper help keep things airy and breathable. An elephant print moulded into the footbed helps provide grip and Jordan DNA.',
        gender: 'men',
        category: 'jordan',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 4,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/334e98dd-9614-4538-a1d4-c24114d20866/JORDAN+STADIUM+90.png',
        title: 'Jordan Stadium 90',
        price: 12795,
        subtitle: "Men's Shoes",
        description: "Comfort is king, but that doesn't mean you have to sacrifice style. Taking design inspiration from the AJ1 and AJ5, the Stadium 90 is ready for everyday wear. The upper is made from leather and airy woven, so you get both breathability and durability, and Nike Air cushioning in the sole keeps your every step light and cushioned.",
        gender: 'men',
        category: 'jordan',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 5,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4c989c51-79c3-4390-a1fb-0a9f408c4b5a/JORDAN+POST+SLIDE.png',
        title: 'Jordan Post',
        price: 2195,
        subtitle: "Men's Slides",
        description: 'Quick, comfy, cool. These slides are made from robust, flexible foam that will stay secure as you rack up those steps. Wide foot coverage holds your feet in place while the asymmetrical design gives you a distinct look.',
        gender: 'men',
        category: 'jordan',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 6,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/00612f72-73e9-488f-9194-19738482785d/BLAZER+PHANTOM+LOW.png',
        title: 'Nike Blazer Phantom Low',
        price: 10295,
        subtitle: "Men's Shoes",
        description: "True to Nike's DNA, built for today. The Blazer Phantom reimagines a classic silhouette in a sleek, low profile. An improved underfoot sensation with thicker sidewalls amplifies comfort without creating bulk.",
        gender: 'men',
        category: 'lifestyle',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 7,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f3c36ef6-f3c7-415a-acd5-85aa20442404/AIR+MAX+DN+SE.png',
        title: 'Nike Air Max Dn SE',
        price: 15995,
        subtitle: 'Shoes',
        description: "Say hello to the next generation of Air technology. The Air Max Dn features our Dynamic Air unit system of dual-pressure tubes, creating a reactive sensation with every step. This results in a futuristic design that's comfortable enough to wear from day to night. And this newest seasonal colour offers the first gradient-treatment upper in this model. Go ahead—Feel The Unreal.",
        gender: 'men',
        category: 'lifestyle',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 8,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/17c85c10-e043-4879-b56c-ff908d5b59ae/NIKE+AIR+MAX+90+PRM.png',
        title: 'Nike Air Max 90 Premium',
        price: 12795,
        subtitle: "Men's Shoes",
        description: "Lace up and feel the legacy. The Air Max 90 stays true to its running roots with the iconic Waffle sole, while stitched overlays and textured accents create the '90s look you love. Finished with easy-to-style colours, its visible Air cushioning adds comfort to your journey.",
        gender: 'men',
        category: 'lifestyle',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {id: 9,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/96d373e5-fe14-4ab8-8579-030e21713dcb/NIKE+AIR+MAX+PLUS+PRM.png',
        title: 'Nike Air Max Plus Premium',
        price: 16995,
        subtitle: "Men's Shoes",
        description: 'Let your attitude have the edge in the Air Max Plus. Complete with airy mesh, unbelievable cushioning and nature-inspired design details, it lets you celebrate your defiant style in comfort. This premium version mixes real and synthetic leather for an elevated look.',
        gender: 'men',
        category: 'lifestyle',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 10,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
        title: "Nike Air Force 1 '07",
        price: 7495,
        subtitle: "Men's Shoes",
        description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
        gender: 'men',
        category: 'lifestyle',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 11,
        img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/396132/01/sv01/fnd/IND/fmt/png/PUMA-Punch-Comfort-Kid's-Sneakers",
        title: "PUMA Punch Comfort Kid's Sneakers",
        price: 2799,
        subtitle: 'Puma White-Puma White ',
        description: "Elevate your kid's shoe game with the Punch Comfort Sneakers from PUMA.The mesh upper provides breathability, while the velcro closure ensures a secure fit. The cushioned collar adds extra comfort, making these sneakers perfect for your kid's delicate feet.Mesh upperRubber outsoleHeel type: FlatShoe width: Regular fitShoe pronation: NeutralHeel-to-toe-drop: 0 mmHook-and-loop closurePUMA Wordmark and Cat logo on tonguePUMA Cat logo on heelPUMA Formstrip on lateral side",
        gender: 'kids',
        category: 'lifestyle',
        brand: 'puma',
        sizes: ['1', '2', '3', '4', '5']
    },
    {
        id: 12,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/378820bf-d936-411c-950b-b80e1033c454/NIKE+QUEST+6.png',
        title: 'Nike Quest 6',
        price: 7095,
        subtitle: "Men's Road Running Shoes",
        description: "The Nike Quest 6 is for runners of all levels. But make no mistake, it's anything but entry level. A super-comfortable and supportive midfoot fit band helps keep you stable for your miles. Plus, a super-soft midsole foam helps cushion each step.",
        gender: 'men',
        category: 'running',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 13,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/997c4570-8698-4a94-94b4-96ab56200e00/NIKE+REVOLUTION+7.png',
        title: 'Nike Revolution 7',
        price: 3695,
        subtitle: "Men's Road Running Shoes",
        description: "We loaded the Revolution 7 with the sort of soft cushioning and support that might change your running world. Stylish as ever, comfortable when the rubber meets the road and performance-driven for your desired pace, it's an evolution of a fan favourite that offers a soft, smooth ride.",
        gender: 'men',
        category: 'running',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 14,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d17327e-1d4d-43c7-8922-3ffc0ae0d495/NIKE+INFINITYRN+4+FP.png',
        title: 'Nike InfinityRN 4 Blueprint',
        price: 14995,
        subtitle: "Men's Road Running Shoes",
        description: 'Maximum cushioning provides elevated comfort for everyday runs. Experience a soft, rocker-shaped platform made with new ReactX foam underfoot, and an ultra-comfortable collar and tongue for a snug feel. Plus, a water-resistant membrane was added to this version to help keep you dry.',
        gender: 'men',
        category: 'running',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 15,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/80b70825-4289-497c-8db5-394aad8b5a3d/NIKE+JOURNEY+RUN.png',
        title: 'Nike Journey Run',
        price: 8495,
        subtitle: "Men's Road Running Shoes",
        description: "Enjoy every step, route and jaunt in the Nike Journey Run. It'll have you striding and smiling on punishing pavements, thanks to an extra-high foam stack and super-soft ComfiRide cushioning. It's so comfortable that you'll already be looking forward to lacing 'em up again.",
        gender: 'men',
        category: 'running',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 16,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2a42cefa-f2f3-4692-8796-a7803496ae9f/NIKE+ZOOMX+INVINCIBLE+RUN+FK+3.png',
        title: 'Nike Invincible 3',
        price: 16995,
        subtitle: "Men's Road Running Shoes",
        description: 'Maximum cushioning provides our most comfortable ride for everyday runs. Experience a breathable Flyknit upper and the robust platform of lightweight ZoomX foam that softens impact. Plus, the midsole of this model is wider and taller than the last for even more cushioned comfort.',
        gender: 'men',
        category: 'running',
        brand: 'nike',
        sizes: ['6', '7', '8', '9', '10']
    },
    {
        id: 17,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6785ad85-33be-4269-bac1-fa769af96cb4/W+AIR+ZOOM+PEGASUS+41.png',
        title: 'Nike Pegasus 41',
        price: 11895,
        subtitle: "Women's Road Running Shoes",
        description: 'Responsive cushioning in the Pegasus provides an energised ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole. Plus, improved engineered mesh on the upper decreases weight and increases breathability.',
        gender: 'women',
        category: 'running',
        brand: 'nike',
        sizes: ['4', '5', '6', '7', '8']
    },
    {
        id: 18,
        img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/39d9ed80-48bd-4e4e-abab-93a7bbc8cb6f/W+PEGASUS+TRAIL+5+GTX.png',
        title: 'Nike Pegasus Trail 5 GORE-TEX',
        price: 15995,
        subtitle: "Women's Waterproof Trail-Running Shoes",
        description: 'The winterized Pegasus Trail 5 provides wet-weather protection for trail running. A waterproof GORE-TEX upper, an all-terrain outsole and reflective design details help you comfortably take on the elements. With a ReactX foam midsole, it gives you responsive cushioning for an energised ride.',
        gender: 'women',
        category: 'running',
        brand: 'nike',
        sizes: ['4', '5', '6', '7', '8']
    },

]
export default bestsellers;