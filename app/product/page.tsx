'use client';

import { useMemo, useState } from 'react';
import { DataGridPremium, GridColDef } from '@mui/x-data-grid-premium';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HighChartWrapper from '@/components/data-grid/components/HighChartWrapper';
import { generateProducts } from '@/data/mockProducts';
import { Product } from '@/types/products';

const ProductAnalysisPage = () => {
  const products = useMemo(() => generateProducts(50), []);
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), []); // Categorias únicas
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0].id); // Produto inicial para gráfico de linha
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>(''); // Filtro de categoria para DataGrid

  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [products, selectedProductId]);
  const filteredProducts = useMemo(() =>
    selectedCategoryFilter ? products.filter(p => p.category === selectedCategoryFilter) : products,
    [products, selectedCategoryFilter]
  );

  // Configuração do Gráfico de Linha (Histórico de Preços)
  const lineChartOptions: Highcharts.Options = {
    chart: { type: 'line' },
    title: { text: `Histórico de Preços de ${selectedProduct?.name}` },
    xAxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                   'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    yAxis: { title: { text: 'Preço (USD)' } },
    series: [{
      name: 'Preço Mensal',
      type: 'line',
      data: selectedProduct?.priceHistory || [], // Usar dados do produto selecionado
      color: '#2196F3'
    }]
  };

  // Configuração do Gráfico de Barras (Estoque por Categoria)
  const barChartOptions: Highcharts.Options = {
    chart: { type: 'bar' },
    title: { text: 'Estoque Total por Categoria' },
    xAxis: {
      categories: categories,
      title: { text: 'Categorias' }
    },
    yAxis: {
      title: { text: 'Total em Estoque' }
    },
    series: [{
      name: 'Estoque',
      type: 'bar',
      color: '#4CAF50',
      data: categories.map(category => {
        const totalStock = products
          .filter(p => p.category === category)
          .reduce((sum, p) => sum + p.stock, 0);
        return { name: category, y: totalStock };
      })
    }]
  };

  // Configuração do Gráfico de Pizza (Distribuição de Produtos por Categoria)
  const pieChartOptions: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Distribuição de Produtos por Categoria' },
    series: [{
      name: 'Produtos',
      type: 'pie',
      data: categories.map(category => {
        const count = products.filter(p => p.category === category).length;
        return { name: category, y: count };
      })
    }]
  };


  // Configuração da DataGrid (com filtro de categoria)
  const columns: GridColDef<Product>[] = [
    {
      field: 'name',
      headerName: 'Produto',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Typography fontWeight="medium">{params.value}</Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row.category}
          </Typography>
        </Box>
      )
    },
    {
      field: 'price',
      headerName: 'Preço',
      width: 120,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`
    },
    {
      field: 'stock',
      headerName: 'Estoque',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {params.value > 0 ? (
            <CheckCircleIcon color="success" fontSize="small" />
          ) : (
            <CancelIcon color="error" fontSize="small" />
          )}
          <Typography>{params.value} unid.</Typography>
        </Box>
      )
    },
    {
      field: 'lastUpdated',
      headerName: 'Atualização',
      width: 150,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString('pt-BR')
    }
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1400, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard de Análise de Produtos (Completo)
      </Typography>

      {/* Seleção de Produto para Gráfico de Linha */}
      <FormControl variant="outlined" sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="product-select-label">Produto para Histórico</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          value={selectedProductId}
          label="Produto para Histórico"
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
        <HighChartWrapper options={lineChartOptions} />
      </Paper>

     
        <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
          <HighChartWrapper options={barChartOptions} />
        </Paper>
        <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
          <HighChartWrapper options={pieChartOptions} />
        </Paper>
      
     

      {/* Filtro de Categoria para DataGrid */}
      <FormControl variant="outlined" sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="category-filter-label">Filtrar por Categoria</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={selectedCategoryFilter}
          label="Filtrar por Categoria"
          onChange={(e) => setSelectedCategoryFilter(e.target.value as string)}
        >
          <MenuItem value="">Todas as Categorias</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>


      <Paper elevation={3} sx={{ height: 600 }}>
        <DataGridPremium
          rows={filteredProducts} // Usar produtos filtrados
          columns={columns}
          density="comfortable"
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: 'price', sort: 'desc' }] }
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default ProductAnalysisPage;