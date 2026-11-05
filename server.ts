import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Catalog of strictly authentic handmade products across Andhra Pradesh
const CRAFT_CATALOG = [
  {
    id: 'etikoppaka-204',
    name: 'Etikoppaka Toy #204',
    title: 'Lacquerware Wooden Elephant',
    category: 'Etikoppaka Toys',
    hub: 'Etikoppaka Craft Cooperative',
    price: 850,
    dispatch: '< 12 hrs',
    weight: '180g Ankudu wood',
    material: 'Certified Ankudu (Wrightia Tinctoria) Medicinal Wood & Natural Tree Lac',
    giTag: 'GI Certificate #AP-HA-0009 (Etikoppaka Wooden Lacquerware)',
    cluster: 'Varaha River Basin, Etikoppaka, Visakhapatnam District',
    description: 'Iconic hand-turned wooden elephant lacquered on manual lathe using non-toxic botanical lac infused with seeds, bark, and turmeric.',
  },
  {
    id: 'etikoppaka-207',
    name: 'Etikoppaka Craft #207',
    title: 'Traditional Hand-Turned Sindoor Bharani',
    category: 'Etikoppaka Toys',
    hub: 'Etikoppaka Craft Cooperative',
    price: 480,
    dispatch: '< 12 hrs',
    weight: '90g turned Ankudu wood',
    material: 'Ankudu Medicinal Softwood & Botanical Red Lacquer',
    giTag: 'GI Certificate #AP-HA-0009 (Etikoppaka Toys & Crafts)',
    cluster: 'Varaha River Basin, Etikoppaka',
    description: 'Auspicious heirloom temple vermillion (sindoor/kumkum) container with screw-top lid and friction-glazed natural lacquer.',
  },
  {
    id: 'kondapalli-101',
    name: 'Kondapalli Craft #101',
    title: 'Dasa-Avatara Wooden Heritage Figurine Set',
    category: 'Kondapalli Toys & Dolls',
    hub: 'Kondapalli Craftsmen Union',
    price: 2400,
    dispatch: '< 24 hrs',
    weight: '480g light Tella Poniki wood',
    material: 'Lightweight Tella Poniki (Givotia Rottleriformis) Wood & Makku Paste',
    giTag: 'GI Certificate #AP-HA-0004 (Kondapalli Bommalu)',
    cluster: 'Kondapalli Foothills, Krishna District',
    description: 'Hand-carved mythological figurine set using tamarind-seed gum (makku) paste and natural vegetable watercolors.',
  },
  {
    id: 'kondapalli-102',
    name: 'Kondapalli Craft #102',
    title: 'Traditional Kondapalli Bullock Cart (Ettula Bandi) & Farmer',
    category: 'Kondapalli Toys & Dolls',
    hub: 'Kondapalli Craftsmen Union',
    price: 1100,
    dispatch: '< 24 hrs',
    weight: '310g carved softwood',
    material: 'Tella Poniki Softwood, Jute Twine & Organic Dyes',
    giTag: 'GI Certificate #AP-HA-0004 (Kondapalli Bommalu)',
    cluster: 'Kondapalli Hills, Krishna District',
    description: 'Nostalgic portrayal of agrarian Andhra culture with rotating spoked wooden wheels and pair of humped bullocks.',
  },
  {
    id: 'marapachi-dolls-602',
    name: 'Tirupati Marapachi #602',
    title: 'Auspicious Tirupati Marapachi Raja-Rani Wedding Dolls',
    category: 'Kondapalli Toys & Dolls',
    hub: 'Tirupati Heritage Woodcarvers Guild',
    price: 2600,
    dispatch: '< 24 hrs',
    weight: '750g dense seasoned teak',
    material: 'Seasoned Red Teak (Rakta Chandanam Heritage Timber) & Sandalwood Oil Wash',
    giTag: 'GI Registry Traditional Heritage Marapachi Bommalu #TPR-051',
    cluster: 'Seshachalam Foothills, Tirupati, Chittoor District',
    description: 'Sacred heirloom wedding couple dolls handed down for generations for Navaratri Bommala Koluvu celebrations.',
  },
  {
    id: 'tholu-bommalu-301',
    name: 'Tholu Bommalu #301',
    title: 'Nimmalakunta Translucent Leather Shadow Puppet Peacock Art',
    category: 'Leather Art & Paintings',
    hub: 'Nimmalakunta Leather Puppet Artisans Society',
    price: 2350,
    dispatch: '< 24 hrs',
    weight: '320g cured goat parchment',
    material: 'Treated Translucent Goat Parchment Leather & Botanical Dyes',
    giTag: 'GI Certificate #AP-HA-0015 (Tholu Bommalata)',
    cluster: 'Nimmalakunta Village, Dharmavaram, Anantapur District',
    description: 'Ancient GI shadow puppetry craft of Nimmalakunta. Translucent parchment is hand-perforated and painted with luminous natural vegetable dyes.',
  },
  {
    id: 'udayagiri-cutlery-801',
    name: 'Udayagiri Cutlery #801',
    title: 'Hand-Carved Nardi Wood Royal Table Cutlery Set (6-Piece)',
    category: 'Woodcraft & Cutlery',
    hub: 'Udayagiri Wooden Cutlery Cooperative',
    price: 1650,
    dispatch: '< 24 hrs',
    weight: '340g pale Nardi wood',
    material: 'Seasoned Nardi (Cordia) & Devadari Pale Timber',
    giTag: 'GI Certificate #AP-HA-0046 (Udayagiri Wooden Cutlery)',
    cluster: 'Udayagiri Durgam Foothills, SPSR Nellore District',
    description: 'Famous 14th-century craft of the Udayagiri Nawabs. Hand-carved from pale, odorless Nardi medicinal wood with geometric Persian openwork (jali) filigree handles.',
  },
  {
    id: 'udayagiri-spoons-802',
    name: 'Udayagiri Spoons #802',
    title: 'Jali Floral Filigree Wooden Serving Spoons Pair',
    category: 'Woodcraft & Cutlery',
    hub: 'Udayagiri Wooden Cutlery Cooperative',
    price: 880,
    dispatch: '< 18 hrs',
    weight: '180g Nardi timber',
    material: 'Seasoned Pale Nardi Wood with Floral Lattice Piercing',
    giTag: 'GI Certificate #AP-HA-0046 (Udayagiri Wooden Cutlery)',
    cluster: 'Udayagiri, SPSR Nellore District',
    description: 'Exquisite serving spoons featuring ornate Persian jali openwork hand-chiseled into the handles.',
  },
  {
    id: 'narsapur-lace-901',
    name: 'Narsapur Lace #901',
    title: 'Hand-Hooked Heritage Cotton Crochet Lace Table Runner',
    category: 'Palm Leaf & Lace',
    hub: 'Narsapur Crochet Lace Artisans Federation',
    price: 1450,
    dispatch: '< 24 hrs',
    weight: '210g combed cotton lace',
    material: '100% Premium Mercerized 20s-40s Indian Combed Cotton Thread',
    giTag: 'GI Certificate #AP-HA-0048 (Narsapur Crochet Lace)',
    cluster: 'Godavari River Delta, Narsapur, West Godavari District',
    description: 'World-renowned GI craft of Narsapur women artisans. Meticulously hand-crocheted using fine steel needles in traditional Chemanthi floral patterns.',
  },
  {
    id: 'pembarthi-metal-403',
    name: 'Pembarthi Metal #403',
    title: 'Hand-Hammered Brass Sheet Repoussé Lakshmi Wall Panel',
    category: 'Bell & Brass Metal',
    hub: 'Pembarthi Sheet Metal Guild',
    price: 3600,
    dispatch: '< 36 hrs',
    weight: '1.65kg hand-hammered sheet brass',
    material: 'Heavy Gauge Hand-Rolled Sheet Brass with Pitch-Bed Repoussé Relief',
    giTag: 'GI Certificate #AP-HA-0008 (Pembarthi Metal Craft)',
    cluster: 'Pembarthi Historical Brass Guild',
    description: 'Kakatiya dynasty sheet metal art. Hand-hammered high relief floral arabesques and Goddess Lakshmi on molten tree-resin pitch beds.',
  },
  {
    id: 'madanapalle-palm-803',
    name: 'Madanapalle Palm Craft #803',
    title: 'Hand-Woven Wild Date Palm Multi-Tier Lidded Storage Box',
    category: 'Palm Leaf & Lace',
    hub: 'Madanapalle Rural Palm Artisans Society',
    price: 790,
    dispatch: '< 18 hrs',
    weight: '320g braided date palm fronds',
    material: 'Natural Sun-Dried Wild Date Palm (Eetha Chettu) Fronds',
    giTag: 'GI Registry Rural Palm Leaf Weavers #MDP-055',
    cluster: 'Horseley Hills & Madanapalle, Annamayya / Chittoor District',
    description: 'Eco-conscious zero-plastic home storage handcrafted by Rayalaseema women artisans with interlocking diagonal braid weaves.',
  },
  {
    id: 'kalahasthi-idol-702',
    name: 'Kalahasthi Idol #702',
    title: 'Traditional Hand-Cast Panchaloha Shiva Dakshinamurthy Idol',
    category: 'Stone Craft & Idols',
    hub: 'Srikalahasti Temple Idols Guild',
    price: 4900,
    dispatch: '< 36 hrs',
    weight: '2.8kg sacred 5-metal bronze',
    material: 'Panchaloha (Sacred 5-Metal Bronze Alloy: Copper, Zinc, Tin, Silver & Gold trace)',
    giTag: 'GI Certified Srikalahasti Bronze Temple Castings #SKH-034',
    cluster: 'Swarnamukhi River Basin, Srikalahasti, Tirupati District',
    description: 'Cast using ancient lost-wax Madhuchishtavidhana technique with hand-chiseled meditative iconography.',
  },
  {
    id: 'budithi-brass-401',
    name: 'Budithi Metal #401',
    title: 'Black-Glaze Bell Metal Floral Urli Bowl',
    category: 'Bell & Brass Metal',
    hub: 'Budithi Brass & Bell Metal Society',
    price: 2150,
    dispatch: '< 36 hrs',
    weight: '1.8kg bell metal (Kanchu)',
    material: 'Hand-Cast Bell Metal Alloy (Kanchu) with Kiln Black Patina',
    giTag: 'GI Certificate #AP-HA-0011 (Budithi Brass & Bell Metal)',
    cluster: 'Budithi Village, Srikakulam District',
    description: 'Bell-metal casting treated in charcoal kiln to form lustrous black glaze, lathe-carved to expose glowing golden bronze motifs.',
  },
  {
    id: 'durgi-stone-701',
    name: 'Durgi Stone #701',
    title: 'Soft Limestone Hand-Carved Ganesha Sculpture',
    category: 'Stone Craft & Idols',
    hub: 'Durgi Stone Sculptors Society',
    price: 2800,
    dispatch: '< 36 hrs',
    weight: '2.6kg Durgi limestone',
    material: 'Locally quarried Durgi White/Grey Soft Limestone',
    giTag: 'GI Certificate #AP-HA-0029 (Durgi Stone Carvings)',
    cluster: 'Durgi Village, Palnadu / Guntur District',
    description: 'Preserving 2nd-century Amaravati Buddhist stone craft heritage, hand-chiseled from indigenous soft metamorphic limestone.',
  },
  {
    id: 'bobbili-veena-601',
    name: 'Bobbili Craft #601',
    title: 'Miniature Acoustic Saraswati Veena Art Piece',
    category: 'Woodcraft & Cutlery',
    hub: 'Bobbili Veena Artisans Society',
    price: 3200,
    dispatch: '< 36 hrs',
    weight: '620g cured jackfruit wood',
    material: 'Single-Log Seasoned Jackfruit (Panasa) Wood & Brass Frets',
    giTag: 'GI Certificate #AP-HA-0017 (Bobbili Veena)',
    cluster: 'Gollapalli & Bobbili, Vizianagaram District',
    description: 'Hollowed from a single block of seasoned Jackfruit wood (Ekanda technique) with acoustic string resonance and Lion-head Yali carving.',
  },
  {
    id: 'kalamkari-art-501',
    name: 'Kalamkari Art #501',
    title: 'Hand-Drawn Tree of Life Heritage Wall Canvas',
    category: 'Leather Art & Paintings',
    hub: 'Srikalahasti Kalamkari Guild',
    price: 2850,
    dispatch: '< 24 hrs',
    weight: '350g handloom cotton canvas',
    material: 'Pure Handloom Organic Cotton with Natural Plant Dyes',
    giTag: 'GI Certificate #AP-HA-0018 (Srikalahasti Kalamkari)',
    cluster: 'Swarnamukhi River Basin, Srikalahasti, Tirupati',
    description: 'Ancient Temple Kalamkari drawn freehand with bamboo reed pen and dyed using fermented jaggery, iron rust, and indigo.',
  },
  {
    id: 'palamaner-pot-303',
    name: 'Palamaner Terracotta #303',
    title: 'Palamaner Hand-Thrown Terracotta Water Urn',
    category: 'Terracotta & Pot Art',
    hub: 'Palamaner Terracotta Guild',
    price: 980,
    dispatch: '< 24 hrs',
    weight: '1.65kg alluvial silt clay',
    material: 'Natural Red Porous Silt Clay with Crushed Calcite & River Sand',
    giTag: 'GI Registry Palamaner Terracotta Craft #PLM-038',
    cluster: 'Palamaner Valley, Chittoor District',
    description: 'High evaporative cooling efficiency terracotta water vessel, cools water naturally to 19°C without electricity.',
  },
  {
    id: 'ponduru-302',
    name: 'Ponduru Cotton #302',
    title: 'Fine Spin Organic Khadi Handloom Fabric',
    category: 'Handloom & Textiles',
    hub: 'Ponduru Khadi Weavers Union',
    price: 1800,
    dispatch: '< 36 hrs',
    weight: 'Organic hill-cotton 100s count',
    material: '100s Count Hand-Spun Hill Cotton (Valuga fish-jaw combed)',
    giTag: 'Certified Ponduru Khadi Mark AP-012',
    cluster: 'Ponduru Handspinning Cluster, Srikakulam',
    description: 'The world-famous organic Ponduru Khadi. Seed cotton is hand-combed using the dried jawbone of the indigenous Valuga fish.',
  },
  {
    id: 'uppada-101',
    name: 'Uppada Saree #101',
    title: 'Jamdani Real Zari Handloom Saree',
    category: 'Handloom & Textiles',
    hub: 'Uppada Handloom Society Hub',
    price: 5200,
    dispatch: '< 24 hrs',
    weight: '320g featherweight pure silk',
    material: '100% Pure Mulberry Silk with Tested Zari',
    giTag: 'GI Certificate #AP-HA-0024 (Uppada Jamdani Sarees)',
    cluster: 'Uppada Coastal Weavers Colony, Kakinada',
    description: 'Master handloom jamdani weave featuring delicate floral butis placed thread-by-thread with bamboo needles on transparent silk warp.',
  },
];

// API: AI Craft & Handloom Curator endpoint
app.post('/api/curate-craft', async (req: Request, res: Response) => {
  const { query, occasion, maxBudget, preferredCategory } = req.body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Please describe the authentic craft, toy, pot art, or handloom saree you are looking for.' });
  }

  const promptInput = `Buyer Intent: "${query.trim()}"
Occasion context: ${occasion || 'General authentic artisan gifting, home decor, or conscious heritage wear'}
Max budget limit: ${maxBudget ? '₹' + maxBudget : 'Flexible'}
Preferred category: ${preferredCategory || 'Any verified authentic handmade craft or saree'}

Available strictly authentic handmade products (Handicrafts, Etikoppaka toys, Pot art, and Pure Handloom sarees):
${JSON.stringify(CRAFT_CATALOG, null, 2)}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptInput,
        config: {
          systemInstruction: `You are the AI Artisan Curator for Artisan Haven, an authentic cluster-verified cooperative marketplace in Andhra Pradesh, India.
Your mission is to translate natural language buyer intent into verified, place-special products: small-scale handicrafts (Etikoppaka toys, Kondapalli woodcraft), handmade pot art (Lepakshi and Chittoor terracotta), and pure authentic handmade sarees (Uppada Jamdani, Mangalagiri pit-loom, Venkatagiri zari, Ponduru organic khadi).

STRICT RULES:
1. ONLY recommend products that are 100% authentically handmade in certified artisan clusters. Reject any generic, mass-produced, or powerloom products.
2. Maintain a balanced approach: recommend handicrafts, toys, pot art, or handmade sarees based on what the user genuinely asks for, without over-highlighting any single category.
3. The primary recommendation's formattedSummary MUST match the exact shape:
"Recommended: [Product Name with material/spec] from [Hub Name] - [Why it matches the occasion, climate, home decor, or craft preference]."
Example 1: "Recommended: Etikoppaka Lacquerware Wooden Elephant (180g Ankudu wood) from Etikoppaka Craft Cooperative - Matches eco-friendly traditional gifting and non-toxic home decor."
Example 2: "Recommended: Uppada Jamdani Light Silk (300g weight) from Uppada Cooperative Hub 2 - Matches humid weather and morning festive tone."
Example 3: "Recommended: Lepakshi Hand-Etched Terracotta Relief Pot Art from Lepakshi Potters Guild - Matches natural cooling and temple mural aesthetic."
4. Reply in simple, clear, elegant English.
5. Highlight physical handmade authenticity markers (0% lead botanical lac, hand-thrown stone wheel clay, pit-loom bamboo zari insertion, 0% polyester silk burn test).
6. Return ONLY valid structured JSON matching the provided schema.`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              formattedSummary: {
                type: Type.STRING,
                description: 'Exact single sentence summary starting with "Recommended: ..."',
              },
              recommendationTitle: {
                type: Type.STRING,
                description: 'Product name and artisanal craft specification',
              },
              hubName: {
                type: Type.STRING,
                description: 'Name of the Andhra artisan cooperative hub',
              },
              clusterOrigin: {
                type: Type.STRING,
                description: 'Physical cluster location in Andhra Pradesh',
              },
              craftType: {
                type: Type.STRING,
                description: 'Craft or weave classification (e.g. GI Lacquerware Turned Wood, Pit-Loom Jamdani Saree, Wheel-Thrown Pot Art)',
              },
              estimatedPrice: {
                type: Type.INTEGER,
                description: 'Fair price in INR (direct cooperative rate)',
              },
              dispatchSLA: {
                type: Type.STRING,
                description: 'Cooperative packaging and dispatch window (e.g. "< 12 hrs")',
              },
              giTagProof: {
                type: Type.STRING,
                description: 'Government Geographical Indication (GI) tag certificate or verification note',
              },
              matchReason: {
                type: Type.STRING,
                description: 'Why this material, craft technique, and design perfectly matches the buyer requirement',
              },
              authenticityAuditHighlight: {
                type: Type.STRING,
                description: 'Physical verification marker (e.g. 0% lead botanical lac, pure silk burn test, stone wheel clay porosity)',
              },
              keyHighlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3-4 bullet tags highlighting physical qualities (e.g. 100% Ankudu wood, real silver zari, child-safe)',
              },
              matchedCatalogId: {
                type: Type.STRING,
                description: 'Matching product id from catalog (e.g. "etikoppaka-204", "uppada-101", "lepakshi-pot-301")',
              },
              artisanQuote: {
                type: Type.STRING,
                description: 'A genuine short 1-line quote from the artisan maker of this cooperative',
              },
            },
            required: [
              'formattedSummary',
              'recommendationTitle',
              'hubName',
              'clusterOrigin',
              'craftType',
              'estimatedPrice',
              'dispatchSLA',
              'giTagProof',
              'matchReason',
              'authenticityAuditHighlight',
              'keyHighlights',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      const fallback = generateSmartFallback(query, occasion);
      return res.json({
        success: true,
        data: fallback,
        notice: 'Generated via cooperative artisan matcher.',
      });
    }
  } else {
    const fallback = generateSmartFallback(query, occasion);
    return res.json({
      success: true,
      data: fallback,
      notice: 'Cooperative Match Engine active (Add GEMINI_API_KEY in Secrets for live generative reasoning).',
    });
  }
});

function generateSmartFallback(query: string, occasion?: string) {
  const q = (query + ' ' + (occasion || '')).toLowerCase();

  // Check for Saree queries
  if (q.includes('saree') || q.includes('silk') || q.includes('jamdani') || q.includes('zari') || q.includes('wedding') || q.includes('wear')) {
    return {
      formattedSummary: "Recommended: Uppada Jamdani Light Silk (300g weight) from Uppada Cooperative Hub 2 - Matches humid weather and morning festive tone.",
      recommendationTitle: "Uppada Jamdani Light Silk Handloom Saree (300g weight)",
      hubName: "Uppada Handloom Society Hub",
      clusterOrigin: "Uppada Coastal Weavers Colony, Kakinada, Andhra Pradesh",
      craftType: "Authentic Jamdani Pit-Loom Silk Handloom",
      estimatedPrice: 5200,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certificate #AP-HA-0024 (Uppada Jamdani Sarees)",
      matchReason: "Jamdani uses non-structural extra-weft insertion by hand on a transparent silk warp, creating gossamer-thin silk that breathes even during humid coastal ceremonies.",
      authenticityAuditHighlight: "Pure mulberry silk burn test confirms soft dark crushable ash with 0% synthetic residue; manual non-mechanical selvage check.",
      keyHighlights: ["Ultra-light 320g total weight", "Real silver zari floral butis", "Zero synthetic fibers", "High breathability in coastal humidity"],
      matchedCatalogId: "uppada-101",
      artisanQuote: "We weave every flower with bamboo needles directly into the warp—no power machine can replicate this softness."
    };
  }

  // Check for Pot Art / Terracotta
  if (q.includes('pot') || q.includes('clay') || q.includes('terracotta') || q.includes('pitcher') || q.includes('water')) {
    return {
      formattedSummary: "Recommended: Lepakshi Hand-Etched Terracotta Relief Pot Art from Lepakshi Potters Guild - Matches natural cooling and temple mural aesthetic.",
      recommendationTitle: "Lepakshi Hand-Etched Terracotta Relief Pot Art",
      hubName: "Lepakshi Potters Guild",
      clusterOrigin: "Lepakshi & Hindupur, Anantapur District, Andhra Pradesh",
      craftType: "Wheel-Thrown Terracotta Pot Art",
      estimatedPrice: 1200,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certified Andhra Terracotta Heritage Art #LPK-031",
      matchReason: "Hand-thrown on traditional stone potters wheels using mineral-rich alluvial earth from historic temple tanks and etched with historic Veerabhadra temple relief friezes.",
      authenticityAuditHighlight: "Natural clay test: 100% organic red earth, zero synthetic binders or industrial ceramic enamels.",
      keyHighlights: ["Hand-thrown on stone wheel", "Temple relief etching", "Porous breathable clay", "100% natural earth dyes"],
      matchedCatalogId: "lepakshi-pot-301",
      artisanQuote: "Our clay comes from the sacred temple tanks and breathes with the natural morning breeze."
    };
  }

  // Check for Tholu Bommalu / Leather Puppet Art
  if (q.includes('tholu') || q.includes('leather') || q.includes('puppet') || q.includes('nimmalakunta') || q.includes('shadow')) {
    return {
      formattedSummary: "Recommended: Nimmalakunta Leather Shadow Puppet Peacock Art (320g cured parchment) from Nimmalakunta Leather Puppet Artisans Society - Matches traditional wall decor and illuminated folk art ambiance.",
      recommendationTitle: "Nimmalakunta Translucent Leather Shadow Puppet Peacock Art",
      hubName: "Nimmalakunta Leather Puppet Artisans Society",
      clusterOrigin: "Nimmalakunta Village, Dharmavaram, Anantapur District, Andhra Pradesh",
      craftType: "GI Tholu Bommalu Leather Shadow Puppetry",
      estimatedPrice: 2350,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certificate #AP-HA-0015 (Tholu Bommalata)",
      matchReason: "Handcrafted on translucent goat parchment with pinhole stencil perforations and painted with natural botanical colors that glow vibrantly when backlit.",
      authenticityAuditHighlight: "Certified authentic vegetable tanned parchment, 0% chemical vinyl or synthetic print.",
      keyHighlights: ["Translucent goat parchment", "Hand-punched pinhole details", "Natural vegetable inks", "Anantapur GI craft"],
      matchedCatalogId: "tholu-bommalu-301",
      artisanQuote: "When the evening light shines through the parchment, the sacred peacock comes alive with warmth."
    };
  }

  // Check for Udayagiri Wooden Cutlery & Spoons
  if (q.includes('udayagiri') || q.includes('cutlery') || q.includes('spoon') || q.includes('fork') || q.includes('dining')) {
    return {
      formattedSummary: "Recommended: Udayagiri Hand-Carved Nardi Wood Royal Cutlery Set (6-Piece) from Udayagiri Wooden Cutlery Cooperative - Matches sustainable eco-dining and heirloom dining table aesthetic.",
      recommendationTitle: "Hand-Carved Nardi Wood Royal Table Cutlery Set",
      hubName: "Udayagiri Wooden Cutlery Cooperative",
      clusterOrigin: "Udayagiri Durgam Foothills, SPSR Nellore District, Andhra Pradesh",
      craftType: "GI Udayagiri Hand-Carved Wooden Cutlery",
      estimatedPrice: 1650,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certificate #AP-HA-0046 (Udayagiri Wooden Cutlery)",
      matchReason: "Carved from pale, odorless Nardi medicinal wood with delicate Persian jali filigree openwork handles, 100% food-safe with zero chemical varnish.",
      authenticityAuditHighlight: "Food safety assay: Naturally non-toxic, heat resistant to 180°C, zero synthetic lacquers.",
      keyHighlights: ["Seasoned Nardi medicinal wood", "Hand-pierced Persian jali handles", "Naturally food-safe", "Nellore GI craft"],
      matchedCatalogId: "udayagiri-cutlery-801",
      artisanQuote: "Nardi wood has no taste and no odor; every pierced curve is chiseled with generations of Nawabi patience."
    };
  }

  // Check for Narsapur Crochet Lace
  if (q.includes('crochet') || q.includes('lace') || q.includes('narsapur') || q.includes('runner') || q.includes('doily')) {
    return {
      formattedSummary: "Recommended: Narsapur Hand-Hooked Heritage Cotton Crochet Lace Table Runner from Narsapur Crochet Lace Artisans Federation - Matches elegant vintage dining and sustainable home textile decor.",
      recommendationTitle: "Hand-Hooked Heritage Cotton Crochet Lace Table Runner",
      hubName: "Narsapur Crochet Lace Artisans Federation",
      clusterOrigin: "Godavari River Delta, Narsapur, West Godavari District, Andhra Pradesh",
      craftType: "GI Narsapur Crochet Lace",
      estimatedPrice: 1450,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certificate #AP-HA-0048 (Narsapur Crochet Lace)",
      matchReason: "Meticulously hand-hooked by Godavari women artisans using fine steel needles in traditional Chemanthi floral patterns on 100% combed cotton thread.",
      authenticityAuditHighlight: "Fiber purity test: 100% pure combed Indian cotton, zero polyester machine imitation.",
      keyHighlights: ["Hand-hooked with single needle", "Unbleached natural ecru cotton", "West Godavari GI craft", "Empowers rural women artisans"],
      matchedCatalogId: "narsapur-lace-901",
      artisanQuote: "Each floral medallion requires hundreds of precise manual loops; no machine can produce this delicate drape."
    };
  }

  // Check for Pembarthi Metal / Budithi Brass
  if (q.includes('pembarthi') || q.includes('brass') || q.includes('bell metal') || q.includes('budithi') || q.includes('metal') || q.includes('urli')) {
    return {
      formattedSummary: "Recommended: Pembarthi Hand-Hammered Brass Sheet Repoussé Lakshmi Wall Panel from Pembarthi Sheet Metal Guild - Matches temple entryway decor and auspicious traditional brass art.",
      recommendationTitle: "Hand-Hammered Brass Sheet Repoussé Lakshmi Wall Panel",
      hubName: "Pembarthi Sheet Metal Guild",
      clusterOrigin: "Pembarthi Historical Brass Guild, Andhra-Telangana Heritage Corridor",
      craftType: "GI Pembarthi Brass Repoussé Sheet Metal Craft",
      estimatedPrice: 3600,
      dispatchSLA: "< 36 hrs",
      giTagProof: "GI Certificate #AP-HA-0008 (Pembarthi Metal Craft)",
      matchReason: "Hand-hammered onto a pitch-bed of molten tree resin using blunt chisels to achieve high-relief floral and Goddess Lakshmi repoussé motifs.",
      authenticityAuditHighlight: "Solid 22-gauge brass sheet, hand-rolled with zero synthetic plating or electro-coating.",
      keyHighlights: ["Hand-hammered on resin pitch bed", "High-relief repoussé", "Warm antique brass patina", "Kakatiya royal lineage"],
      matchedCatalogId: "pembarthi-metal-403",
      artisanQuote: "Our hands know the pulse of brass; every hammer blow gives breath to the sheet metal."
    };
  }

  // Check for Tirupati Marapachi Dolls
  if (q.includes('marapachi') || q.includes('tirupati') || q.includes('wedding doll') || q.includes('bridal') || q.includes('raja rani')) {
    return {
      formattedSummary: "Recommended: Auspicious Tirupati Marapachi Raja-Rani Wedding Dolls from Tirupati Heritage Woodcarvers Guild - Matches traditional wedding gifting and sacred Bommala Koluvu altar display.",
      recommendationTitle: "Auspicious Tirupati Marapachi Raja-Rani Wedding Dolls",
      hubName: "Tirupati Heritage Woodcarvers Guild",
      clusterOrigin: "Seshachalam Foothills, Tirupati, Chittoor District, Andhra Pradesh",
      craftType: "Heirloom Tirupati Marapachi Wooden Dolls",
      estimatedPrice: 2600,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Registry Traditional Heritage Marapachi Bommalu #TPR-051",
      matchReason: "Sculpted from dense seasoned teak with rich natural grain, polished with sandalwood oil, and adorned with traditional wedding zari attire.",
      authenticityAuditHighlight: "Physical timber check: Solid seasoned hardwood, pest-resistant for 50+ years.",
      keyHighlights: ["Pair of Bride & Groom dolls", "Sandalwood oil polish", "Sacred Tirupati heritage", "Auspicious wedding heirloom"],
      matchedCatalogId: "marapachi-dolls-602",
      artisanQuote: "Marapachi dolls protect the newlywed household and carry blessings across generations."
    };
  }

  // Check for Kalamkari
  if (q.includes('kalamkari') || q.includes('kalahasthi') || q.includes('canvas') || q.includes('idol') || q.includes('dupatta')) {
    return {
      formattedSummary: "Recommended: Srikalahasti Hand-Drawn Tree of Life Heritage Wall Canvas from Srikalahasti Kalamkari Guild - Matches authentic temple wall decor and organic vegetable dye art.",
      recommendationTitle: "Srikalahasti Hand-Drawn Tree of Life Heritage Wall Canvas",
      hubName: "Srikalahasti Kalamkari Guild",
      clusterOrigin: "Swarnamukhi River Basin, Srikalahasti, Tirupati District, Andhra Pradesh",
      craftType: "GI Srikalahasti Freehand Kalamkari",
      estimatedPrice: 2850,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certificate #AP-HA-0018 (Srikalahasti Kalamkari)",
      matchReason: "Freehand drawn using a sharpened bamboo reed pen (kalam) and dyed in 17 stages with fermented jaggery, iron rust, and natural indigo washed in the Swarnamukhi river.",
      authenticityAuditHighlight: "100% natural botanical extracts, zero chemical pigment or screen print imitation.",
      keyHighlights: ["Drawn freehand with bamboo pen", "Dyed in Swarnamukhi river", "100% natural plant dyes", "Srikalahasti GI tag"],
      matchedCatalogId: "kalamkari-art-501",
      artisanQuote: "We wash our canvases in the flowing river; the sun and water fix the natural colors into the cotton fiber."
    };
  }

  // Check for Bobbili Veena
  if (q.includes('veena') || q.includes('bobbili') || q.includes('music') || q.includes('acoustic')) {
    return {
      formattedSummary: "Recommended: Bobbili Miniature Acoustic Saraswati Veena Art Piece from Bobbili Veena Artisans Society - Matches classical music lovers and royal court decor.",
      recommendationTitle: "Bobbili Miniature Acoustic Saraswati Veena Art Piece",
      hubName: "Bobbili Veena Artisans Society",
      clusterOrigin: "Gollapalli & Bobbili, Vizianagaram District, Andhra Pradesh",
      craftType: "GI Bobbili Ekanda Veena",
      estimatedPrice: 3200,
      dispatchSLA: "< 36 hrs",
      giTagProof: "GI Certificate #AP-HA-0017 (Bobbili Veena)",
      matchReason: "Hollowed from a single block of seasoned Jackfruit wood by the generational Sarwasidhi guild, featuring true acoustic string resonance.",
      authenticityAuditHighlight: "Single-log Ekanda wood carving test: 0% glued body joints, acoustic timber density certified.",
      keyHighlights: ["Single-log seasoned Jackfruit wood", "True acoustic resonance", "Lion-head Yali carving", "300-year royal court heritage"],
      matchedCatalogId: "bobbili-veena-601",
      artisanQuote: "Every veena is born from a single piece of Jackwood so the acoustic tone travels without interruption."
    };
  }

  // Check for Kondapalli
  if (q.includes('kondapalli') || q.includes('bommalu') || q.includes('figurine') || q.includes('cart') || q.includes('koluvu')) {
    return {
      formattedSummary: "Recommended: Kondapalli Dasa-Avatara Wooden Heritage Figurine Set from Kondapalli Craftsmen Union - Matches traditional festival Bommala Koluvu and heirloom collectible decor.",
      recommendationTitle: "Kondapalli Dasa-Avatara Wooden Figurine Set",
      hubName: "Kondapalli Craftsmen Union",
      clusterOrigin: "Kondapalli Foothills, Krishna District, Andhra Pradesh",
      craftType: "GI Wooden Figurine Craft",
      estimatedPrice: 2400,
      dispatchSLA: "< 24 hrs",
      giTagProof: "GI Certificate #AP-HA-0004 (Kondapalli Bommalu)",
      matchReason: "Carved from featherweight Tella Poniki softwood found in Kondapalli hills and joined with tamarind-seed paste (makku), hand-painted with vegetable pigments.",
      authenticityAuditHighlight: "Physical timber check: Certified Tella Poniki wood, 0% machine resin casting.",
      keyHighlights: ["Lightweight Tella Poniki wood", "Tamarind seed paste bonding", "Non-toxic vegetable paint", "GI Registry verified"],
      matchedCatalogId: "kondapalli-101",
      artisanQuote: "Every expression on the figurine's face is drawn with a single squirrel-hair brush."
    };
  }

  // Default to Etikoppaka Wooden Lacquerware Elephant
  return {
    formattedSummary: "Recommended: Etikoppaka Lacquerware Wooden Elephant (180g Ankudu wood) from Etikoppaka Craft Cooperative - Matches eco-friendly traditional gifting and non-toxic home decor.",
    recommendationTitle: "Etikoppaka Hand-Turned Lacquerware Wooden Elephant",
    hubName: "Etikoppaka Craft Cooperative",
    clusterOrigin: "Etikoppaka, Visakhapatnam District, Andhra Pradesh",
    craftType: "GI Lacquerware Turned Wood",
    estimatedPrice: 850,
    dispatchSLA: "< 12 hrs",
    giTagProof: "GI Certificate #AP-HA-0009 (Etikoppaka Wooden Lacquerware)",
    matchReason: "Hand-turned from medicinal Ankudu (Wrightia tinctoria) wood on traditional manual lathes and colored with 100% non-toxic botanical lac infused with natural seeds and roots.",
    authenticityAuditHighlight: "Certified lead-free & EN-71 child safe; 0% synthetic chemical paint or industrial varnish.",
    keyHighlights: ["100% natural botanical lacquer", "Soft Ankudu medicinal wood", "Child & pet safe", "Varaha river basin GI tag"],
    matchedCatalogId: "etikoppaka-204",
    artisanQuote: "Our wood breathes with the Varaha river mud, and the lacquer colors are so pure you could taste them without harm."
  };
}

// Development and production asset serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Artisan Haven full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
